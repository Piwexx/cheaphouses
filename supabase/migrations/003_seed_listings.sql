insert into public.listings
  (id, country, flag, country_short, location, location_short, price, currency_symbol, title, meta, note, image, tone, is_new)
values
  (
    1, 'Portugal', '🇵🇹', 'Portugal', 'Alentejo · Portugal', 'Alentejo, Portugal',
    '28.000', '€', 'Stone farmhouse with 3,800m² of land',
    ARRAY['3 rooms', '140 m²', 'Fixer-upper'],
    'The roof collapsed in the east wing in the 90s and was never fixed. **The rest of the structure is solid** — a local builder in Évora estimated €17–22K to make it livable. The land is 3,800m² with olive trees. No agent; contact the municipal office directly.',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1400&q=80&fit=crop',
    'olive', true
  ),
  (
    2, 'Italy', '🇮🇹', 'Italy', 'Calabria · Italy', 'Calabria, Italy',
    '19.000', '€', '2-bedroom stone house, 11 years in probate',
    ARRAY['2 rooms', '85 m²', 'Rewire needed'],
    'Inherited by three siblings who could not agree on a sale price for a decade. **The probate is now resolved**; they want it gone before tax season. Habitable as-is but the wiring is from the 70s and would need a full pass. Shared wall both sides. Comune wants new residents.',
    'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1400&q=80&fit=crop',
    'terracotta', true
  ),
  (
    3, 'Germany', '🇩🇪', 'Germany', 'Mecklenburg · Germany', 'Mecklenburg, Germany',
    '26.000', '€', 'Brick farmhouse on 1.2 hectares',
    ARRAY['4 rooms', '180 m²', 'Agricultural'],
    'Classified agricultural — a foreigner can buy it but converting to residential takes 18 months of municipal paperwork. **The building itself is in good shape**: new roof in 2018, dry inside, original parquet under the lino. Land has two outbuildings and an old apple orchard.',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80&fit=crop',
    'timber', false
  ),
  (
    4, 'Spain', '🇪🇸', 'Spain', 'Galicia · Spain', 'Galicia, Spain',
    '13.500', '€', 'Granite cottage, single-lane road access',
    ARRAY['2 rooms', '80 m²', 'No mains gas'],
    'The lowest-priced thing in this newsletter all year. **It is cheap for reasons:** no mains gas, no central heating, and a 4km single-lane road that floods in November. Roof is solid, walls are 60cm granite, dry inside. The previous owner cooked in the courtyard.',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=80&fit=crop',
    'granite', false
  ),
  (
    5, 'Japan', '🇯🇵', 'Japan', 'Hyogo Prefecture · Japan', 'Hyogo, Japan',
    '3,200,000', '¥', 'Akiya farmhouse with rice field views',
    ARRAY['5 rooms', '120 m²', 'Vacant home'],
    '12 years empty. Structural inspection mandatory before any sale — budget ¥150K for it. **Tatami rooms need replacing** but the post-and-beam frame is original cedar and tight. The village has a relocation grant that can offset up to ¥2M of the work for residents under 40.',
    'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=1400&q=80&fit=crop',
    'cedar', true
  ),
  (
    6, 'USA', '🇺🇸', 'West Virginia', 'Pocahontas County · West Virginia', 'Pocahontas Co., WV',
    '35,000', '$', 'Mountain bungalow on 1.2 acres',
    ARRAY['2 rooms', '85 m²', 'Cosmetic'],
    'Estate sale. Cosmetic work only — floors, paint, one window. **Septic was redone in 2019.** 35 minutes to the nearest grocery; an hour to a hospital. If you want quiet, this is quiet. If you want delivery, this is not the listing for you.',
    'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1400&q=80&fit=crop',
    'pine', false
  ),
  (
    7, 'Canada', '🇨🇦', 'Nova Scotia', 'Nova Scotia · Canada', 'Nova Scotia, Canada',
    '58,000', 'CA$', 'Century farmhouse, 4 acres of cleared land',
    ARRAY['3 rooms', '110 m²', 'New roof 2022'],
    'Roof was redone in 2022, oil furnace replaced 2020, otherwise original. **The well water tests clean**; the septic needs a pump-out and an inspection. Owners moved to Halifax and are firm at this price.',
    'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1400&q=80&fit=crop',
    'pine', false
  ),
  (
    8, 'Sweden', '🇸🇪', 'Sweden', 'Dalarna · Sweden', 'Dalarna, Sweden',
    '43.000', '€', 'Red timber cottage near lake',
    ARRAY['2 rooms', '70 m²', 'Falu red'],
    'Falu-red panel exterior repainted three summers ago. **No central heating** — wood stove and electric panels. 600m to the lake, walking-distance to a station with a 90-min train to Stockholm. Habitable as-is for a summer house; an honest winter home would need insulation work.',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1400&q=80&fit=crop',
    'terracotta', true
  ),
  (
    9, 'Portugal', '🇵🇹', 'Portugal', 'Beira Baixa · Portugal', 'Beira Baixa, Portugal',
    '47.500', '€', 'Village house with vineyard and well',
    ARRAY['3 rooms', '120 m²', 'Habitable'],
    'Habitable as-is, with a working well and 800m² of mature vineyard out back. **Kitchen was redone in 2021.** The catch is the village — fewer than 200 people, no school, the bakery closes for August. If isolation is the appeal, this is the listing.',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80&fit=crop',
    'olive', false
  ),
  (
    10, 'Italy', '🇮🇹', 'Italy', 'Sicily · Italy', 'Sicily, Italy',
    '1', '€', 'One-euro townhouse, Mussomeli scheme',
    ARRAY['4 rooms', '95 m²', 'Reno obligation'],
    'The famous €1 program. **Real catch:** you must commit €25K of renovation within 3 years and post a €5K deposit. Building has a fresh roof (2022) but no plumbing on the upper floor. The municipality is genuinely helpful with paperwork.',
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1400&q=80&fit=crop',
    'terracotta', true
  ),
  (
    11, 'France', '🇫🇷', 'France', 'Creuse · France', 'Creuse, France',
    '36.000', '€', 'Stone longère with attached barn',
    ARRAY['3 rooms', '110 m²', 'Habitable'],
    'Longère typology — long single-storey stone with attached barn. **Habitable but spartan.** Septic was replaced 2019; roof is original slate and needs watching. 12 minutes from Guéret. The Creuse is the cheapest department in France and is depopulating; do your research on services.',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1400&q=80&fit=crop',
    'granite', false
  ),
  (
    12, 'Spain', '🇪🇸', 'Spain', 'Aragon · Spain', 'Aragon, Spain',
    '24.000', '€', 'Adobe village house, three floors',
    ARRAY['5 rooms', '160 m²', 'Light reno'],
    'Three floors plus attic, all habitable. **Adobe construction — thick walls, cool in summer.** The catch is the village population (94) and the 40-minute drive to a proper supermarket. Seller is the daughter of the previous owner; she lives in Zaragoza and wants a quick close.',
    'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1400&q=80&fit=crop',
    'terracotta', false
  ),
  (
    13, 'Japan', '🇯🇵', 'Japan', 'Tokushima Prefecture · Japan', 'Tokushima, Japan',
    '2,800,000', '¥', 'Mountain akiya on terraced land',
    ARRAY['4 rooms', '95 m²', 'Akiya bank'],
    'Listed through the prefectural akiya bank; the owner left a decade ago. **Inspection mandatory** — budget ¥180K. Terraced land is 1,400m², mostly bamboo now. The local relocation office helps with paperwork and translation if you commit to two years of residency.',
    'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=1400&q=80&fit=crop',
    'cedar', false
  ),
  (
    14, 'Germany', '🇩🇪', 'Germany', 'Saxony-Anhalt · Germany', 'Saxony-Anhalt, Germany',
    '55.000', '€', 'Half-timbered townhouse, three floors',
    ARRAY['6 rooms', '195 m²', 'Listed'],
    'Plumbing and wiring are 1970s and need replacing. **Roof tiles last redone 2014.** Listed building — facade changes need municipal approval but the town actively helps with restoration grants. Walking-distance to the train station and a Lidl.',
    'https://images.unsplash.com/photo-1582160683329-9bf8a9c7c9c1?w=1400&q=80&fit=crop',
    'timber', false
  ),
  (
    15, 'USA', '🇺🇸', 'Vermont', 'Northeast Kingdom · Vermont', 'NEK, Vermont',
    '48,000', '$', 'Hunting cabin on 6 wooded acres',
    ARRAY['1 room', '40 m²', 'Off-grid'],
    'Off-grid. **No utilities, no septic, no road frontage past November.** Cabin is solid, dry, and tight — woodstove, propane fridge, gravity-fed spring water. Buyers should drive in before committing; the access trail is a 0.4-mile walk in mud season.',
    'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1400&q=80&fit=crop',
    'pine', true
  ),
  (
    16, 'Canada', '🇨🇦', 'New Brunswick', 'New Brunswick · Canada', 'New Brunswick, Canada',
    '72,000', 'CA$', 'Cedar-shingle home on 8 acres',
    ARRAY['4 rooms', '140 m²', 'Move-in'],
    'Move-in ready. **Cedar shingles redone 2020, drilled well 2018, new propane furnace 2023.** 8 acres of mixed woodland, mostly maple and birch. 25 minutes to Fredericton. Owners are downsizing and motivated; this one will move.',
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1400&q=80&fit=crop',
    'pine', true
  )
on conflict (id) do nothing;
