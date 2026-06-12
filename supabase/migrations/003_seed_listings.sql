insert into public.listings
  (id, country, flag, country_short, location, location_short, price, currency_symbol, title, meta, note, image, tone, is_new)
values
  (
    1, 'USA', '🇺🇸', 'Tennessee', 'Unicoi County · Tennessee', 'Unicoi Co., TN',
    '42,000', '$', 'Stone farmhouse on 3.8 acres, Appalachians',
    ARRAY['3 rooms', '110 m²', 'Fixer-upper'],
    'The east-wing floor joists are soft — a local contractor estimated $8–12K to fix. **The rest is genuinely solid**: 18-inch stone walls, dry basement, working spring-fed cistern. 40 minutes to Johnson City. No agent; the heirs want to split the proceeds before December.',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1400&q=80&fit=crop',
    'olive', true
  ),
  (
    2, 'USA', '🇺🇸', 'Mississippi', 'Leflore County · Mississippi', 'Leflore Co., MS',
    '18,000', '$', 'Shotgun house, one block from the square',
    ARRAY['3 rooms', '90 m²', 'Rewire needed'],
    'Three siblings inherited this from an aunt; wiring is original knob-and-tube and must go. **The structure is textbook shotgun**: straight through, no load-bearing interior walls, cheap to gut and redo. One block from the Greenwood square. Buyer needs to move before the city pulls the occupancy permit.',
    'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1400&q=80&fit=crop',
    'terracotta', true
  ),
  (
    3, 'USA', '🇺🇸', 'Iowa', 'Ringgold County · Iowa', 'Ringgold Co., IA',
    '29,000', '$', 'Brick farmhouse on 1.5 acres, grain country',
    ARRAY['4 rooms', '155 m²', 'New roof 2019'],
    'Roof replaced 2019, furnace 2021, otherwise original 1940s. **Windows are the main issue** — original wood frames that rattle in a north wind. Ringgold County is the cheapest county in Iowa; 90 minutes to Des Moines. Seller is pricing to move, not to negotiate.',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80&fit=crop',
    'timber', false
  ),
  (
    4, 'USA', '🇺🇸', 'New Mexico', 'Mora County · New Mexico', 'Mora Co., NM',
    '14,500', '$', 'Adobe house, two acres, high desert',
    ARRAY['2 rooms', '85 m²', 'No central heat'],
    'Lowest-priced thing in this newsletter in months. **Cheap for a reason**: no central heat, no mains water, composting outhouse. Adobe walls are 22 inches and in good shape. At 7,200ft the winters are serious. The nearest paved road is 4 miles. If that reads like a problem, skip it.',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=80&fit=crop',
    'granite', false
  ),
  (
    5, 'USA', '🇺🇸', 'Arkansas', 'Newton County · Arkansas', 'Newton Co., AR',
    '27,000', '$', 'Ozarks cabin with spring-fed creek',
    ARRAY['3 rooms', '95 m²', 'Vacant home'],
    'Left vacant five years when the owner moved to Springfield. **The spring-fed creek runs year-round and tested clean.** Foundation is solid concrete block. Roof has one soft spot over the porch addition; local estimate to fix: $2,500. 40 minutes to Harrison. No agent — contact the executor directly.',
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
    7, 'USA', '🇺🇸', 'Maine', 'Aroostook County · Maine', 'Aroostook Co., ME',
    '55,000', '$', 'Cape farmhouse on 4 acres, potato country',
    ARRAY['3 rooms', '130 m²', 'Habitable'],
    'New roof 2022, oil furnace 2021, otherwise 1940s original. **The well drilled in 2016 pumps clean.** Aroostook County is the most agricultural county east of the Mississippi; winters are serious and the closest hospital is 45 minutes. Owners moved to Portland and want a quick close.',
    'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1400&q=80&fit=crop',
    'pine', false
  ),
  (
    8, 'USA', '🇺🇸', 'Michigan', 'Alger County · Michigan', 'Alger Co., MI',
    '39,000', '$', 'Lakeside camp, Upper Peninsula, 200ft of frontage',
    ARRAY['2 rooms', '65 m²', 'Off-grid'],
    'Off-grid, 200 feet of sandy frontage on a glacial lake. **The cabin is tight**: metal roof 2018, spray-foam insulation, good propane setup. No septic — composting toilet. Electric grid is 1.4 miles away; owners got a quote of $18K to connect. Priced for cash; no conventional financing in Alger County for this type.',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1400&q=80&fit=crop',
    'terracotta', true
  ),
  (
    9, 'USA', '🇺🇸', 'West Virginia', 'Tucker County · West Virginia', 'Tucker Co., WV',
    '52,000', '$', 'Timber-frame farmhouse at 3,400ft elevation',
    ARRAY['3 rooms', '125 m²', 'Habitable'],
    'Habitable as-is at 3,400ft. **Timber frame is post-1900 chestnut** — tight, dry, no rot. The summer is genuinely beautiful up here; winters close the road for 6–10 weeks. Spring is the only water source; a drilled well would add $9–14K. No agent; estate sale, priced to settle fast.',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80&fit=crop',
    'olive', false
  ),
  (
    10, 'USA', '🇺🇸', 'Ohio', 'Meigs County · Ohio', 'Meigs Co., OH',
    '22,000', '$', 'Brick Victorian, three floors, river town',
    ARRAY['5 rooms', '180 m²', 'Light reno'],
    'Three-story brick, original heart-pine floors mostly intact. **The catch is the plumbing**: cast-iron stack cracked in the basement, full replacement needed. Sitting 200 yards from the Ohio River; no flood history on the title but verify the county flood map. Light reno otherwise — paint, fixtures, one bathroom.',
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1400&q=80&fit=crop',
    'terracotta', true
  ),
  (
    11, 'USA', '🇺🇸', 'Kentucky', 'Leslie County · Kentucky', 'Leslie Co., KY',
    '31,000', '$', 'Stone hollow homestead, 1.8 acres',
    ARRAY['3 rooms', '100 m²', 'Habitable'],
    'Hollow homestead — spring house, smokehouse, and main structure all on 1.8 acres. **Main house is habitable**: oil furnace 2019, metal roof 2016. The catch is access: paved road ends 0.7 miles out, seasonal road only from there. If that is a feature and not a bug, this is the listing.',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1400&q=80&fit=crop',
    'granite', false
  ),
  (
    12, 'USA', '🇺🇸', 'New York', 'Delaware County · New York', 'Delaware Co., NY',
    '26,500', '$', 'Village house, three floors, Catskills',
    ARRAY['5 rooms', '160 m²', 'Cosmetic'],
    'Daughter of the previous owner lives in Brooklyn and wants this gone. **Three floors, original wide-plank pine on the second level**, plaster walls throughout. Cosmetic work: paint, some plaster, kitchen update. Walking distance to the village center. No cellar; full crawl space.',
    'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1400&q=80&fit=crop',
    'terracotta', false
  ),
  (
    13, 'USA', '🇺🇸', 'Minnesota', 'Lake of the Woods County · Minnesota', 'Lake of the Woods, MN',
    '33,000', '$', 'Northwoods cabin, 100ft lake frontage',
    ARRAY['2 rooms', '55 m²', 'Off-grid'],
    'Left unused for 8 years; title is clear. **100 feet of sandy frontage, direct lake access**, state forest behind. Composting toilet, propane everything. Road closes for 10 weeks in winter. Inspection by a certified inspector with northwoods experience is strongly recommended before committing.',
    'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=1400&q=80&fit=crop',
    'cedar', false
  ),
  (
    14, 'USA', '🇺🇸', 'Pennsylvania', 'Bedford County · Pennsylvania', 'Bedford Co., PA',
    '49,000', '$', 'Fieldstone house, two floors, 0.8 acres',
    ARRAY['4 rooms', '145 m²', 'New roof 2021'],
    'Fieldstone from the original farm, circa 1870. **New roof 2021, oil furnace 2020.** Plumbing is 1960s copper — functional but aging. Listed in the county historic registry; facade changes need municipal approval, but restoration grants are available. Two-hour drive to Pittsburgh.',
    'https://images.unsplash.com/photo-1582160683329-9bf8a9c7c9c1?w=1400&q=80&fit=crop',
    'timber', false
  ),
  (
    15, 'USA', '🇺🇸', 'Vermont', 'Northeast Kingdom · Vermont', 'NEK, VT',
    '48,000', '$', 'Hunting cabin on 6 wooded acres',
    ARRAY['1 room', '40 m²', 'Off-grid'],
    'Off-grid. **No utilities, no septic, no road frontage past November.** Cabin is solid, dry, and tight — woodstove, propane fridge, gravity-fed spring water. Buyers should drive in before committing; the access trail is a 0.4-mile walk in mud season.',
    'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1400&q=80&fit=crop',
    'pine', true
  ),
  (
    16, 'USA', '🇺🇸', 'Montana', 'Phillips County · Montana', 'Phillips Co., MT',
    '68,000', '$', 'Ranch cabin on 8 acres, Hi-Line',
    ARRAY['3 rooms', '120 m²', 'Move-in'],
    'Move-in ready — the only listing this week that qualifies. **Drilled well 2019, propane furnace 2022, cedar shingles redone 2021.** 8 acres of shortgrass prairie with a creek easement. Phillips County is a 3-hour drive from Great Falls; if that is what you want, everything here works. Owners are downsizing and motivated.',
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1400&q=80&fit=crop',
    'pine', true
  )
on conflict (id) do update set
  country = excluded.country,
  flag = excluded.flag,
  country_short = excluded.country_short,
  location = excluded.location,
  location_short = excluded.location_short,
  price = excluded.price,
  currency_symbol = excluded.currency_symbol,
  title = excluded.title,
  meta = excluded.meta,
  note = excluded.note,
  image = excluded.image,
  tone = excluded.tone,
  is_new = excluded.is_new;
