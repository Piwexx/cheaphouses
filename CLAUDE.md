# CLAUDE.md

@AGENTS.md

---

## Stack

- **Framework**: Next.js 16 con App Router (TypeScript estricto)
- **Estilos**: Tailwind CSS v4 + shadcn/ui para componentes
- **Base de datos**: PostgreSQL vía Supabase (cliente server-side en Server Components)
- **Auth**: Supabase Auth vía `@supabase/ssr` (email+contraseña y magic link; sesión en cookies, refresh en `proxy.ts`)
- **Pagos**: Stripe (Checkout + Customer Portal, webhook en `app/api/webhooks/stripe`)
- **API**: Route Handlers en `app/api/` + Server Actions para mutaciones
- **Estado global**: Zustand (solo client-side, estado mínimo necesario)
- **Fetching**: fetch nativo en Server Components, React Query solo en Client Components
- **Validación**: Zod en toda la app (forms, API, env vars)

---

## Estructura de carpetas

```
my-app/
├── app/
│   ├── layout.tsx          # Root layout — HTML, fonts, providers globales
│   ├── page.tsx            # Home
│   ├── loading.tsx         # Suspense global
│   ├── error.tsx           # Error boundary global
│   ├── (auth)/             # Grupo de rutas auth (mismo layout)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/        # Grupo de rutas protegidas
│   │   ├── layout.tsx      # Layout con sidebar, protegido por proxy.ts
│   │   └── dashboard/page.tsx
│   └── api/
│       └── [resource]/
│           └── route.ts    # Route handlers REST
├── components/
│   ├── ui/                 # Componentes shadcn/ui (no modificar directamente)
│   ├── forms/              # Formularios con React Hook Form + Zod
│   └── layouts/            # Wrappers de layout reutilizables
├── lib/
│   ├── db.ts               # Cliente Supabase server-side — ÚNICA fuente de queries
│   ├── auth.ts             # Configuración Auth.js
│   ├── validations.ts      # Schemas Zod compartidos
│   └── utils.ts            # Helpers puros (sin side effects)
├── actions/                # Server Actions (mutaciones de datos)
│   └── [resource].ts
├── hooks/                  # Custom hooks solo para Client Components
├── stores/                 # Zustand stores (solo estado UI)
├── types/                  # TypeScript types globales
├── proxy.ts                # Network boundary (antes middleware.ts)
├── next.config.ts
├── CLAUDE.md               # Este archivo
└── AGENTS.md               # Docs bundleadas de Next.js 16
```

---

## Reglas de rendering

### Server Components (default)
- Todo componente es Server Component a menos que diga lo contrario.
- Hacen fetch directamente con `async/await` sin useEffect ni SWR.
- Nunca usan `useState`, `useEffect`, `useRef` ni event handlers.
- Los params son `Promise<{...}>` en Next.js 16 — siempre `await params`.

```tsx
// ✅ Correcto
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id) // query en lib/db.ts
  return <ProductCard product={product} />
}
```

### Client Components
- Solo cuando se necesita: `useState`, `useEffect`, event handlers, browser APIs.
- Siempre declarar `"use client"` en la primera línea.
- Son hojas del árbol: reciben datos como props desde Server Components.
- No hacen fetch directamente — reciben datos o usan Server Actions.

```tsx
// ✅ Correcto
"use client"
import { useState } from "react"

export function Counter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

---

## Reglas de datos

- **Queries de lectura**: Siempre en `lib/db.ts`. Nunca SQL ni Supabase client inline en componentes.
- **Mutaciones**: Siempre via Server Actions en `actions/`. Nunca mutaciones directas en componentes.
- **Validación de input**: Siempre con Zod antes de tocar la DB.
- **Nunca** exponer el Supabase service key en Client Components.

```ts
// lib/db.ts — ✅ único lugar con lógica de DB
import { createServerClient } from "@supabase/ssr"

export async function getUser(id: string) {
  const supabase = createServerClient(...)
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()
  if (error) throw new Error(error.message)
  return data
}
```

```ts
// actions/users.ts — ✅ mutaciones
"use server"
import { z } from "zod"
import { updateUser } from "@/lib/db"

const schema = z.object({ name: z.string().min(2) })

export async function updateUserAction(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten() }
  return updateUser(parsed.data)
}
```

---

## proxy.ts (antes middleware.ts)

- Lógica de red: protección de rutas, redirects, headers.
- Corre en Node.js runtime (no Edge).
- Rutas protegidas: cualquier ruta bajo `/(dashboard)`.

```ts
// proxy.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function proxy(request: NextRequest) {
  const session = await auth()
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
```

---

## Caching (Next.js 16)

- Usar `"use cache"` en funciones que traen datos costosos o poco frecuentes.
- Por defecto todo es dinámico (sin cache implícito como en v14/v15).
- Para invalidar: `revalidateTag("nombre", "max")` — el segundo argumento es obligatorio en v16.

```ts
// ✅ Next.js 16
"use cache"
export async function getProducts() {
  const products = await db.products.findMany()
  return products
}
```

```ts
// ✅ Invalidación
import { revalidateTag } from "next/cache"
revalidateTag("products", "max")
```

---

## Convenciones de nombres

- Archivos de componentes: `PascalCase.tsx` (ej. `ProductCard.tsx`)
- Archivos de utilidades: `camelCase.ts` (ej. `formatDate.ts`)
- Server Actions: sufijo `Action` (ej. `createProductAction`)
- Route handlers: siempre en `app/api/[resource]/route.ts`
- Variables de entorno: `NEXT_PUBLIC_` solo para lo que va al cliente

---

## Comandos

```bash
npm run dev       # Servidor de desarrollo (Turbopack por defecto)
npm run build     # Build de producción
npm run lint      # ESLint
npx tsc --noEmit  # Type check sin compilar
```

---

## Lo que Claude NO debe hacer

- ❌ Usar `middleware.ts` — usar `proxy.ts`
- ❌ Queries de DB inline en componentes — siempre en `lib/db.ts`
- ❌ `useEffect` para fetch de datos — usar Server Components
- ❌ `params` sin `await` — en v16 es `Promise<{...}>`
- ❌ `revalidateTag("tag")` sin segundo argumento — en v16 es obligatorio
- ❌ `experimental.ppr` en `next.config.ts` — reemplazado por `cacheComponents: true`
- ❌ Instalar `babel-plugin-react-compiler` si `reactCompiler: true` no está habilitado
- ❌ Hardcodear colores hex — usar variables CSS o clases Tailwind
