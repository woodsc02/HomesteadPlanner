const { useState, useEffect, useMemo, useRef, Fragment } = React;



// ============= DATABASE =============

const ANIMALS = [
  {
    name: "Chickens (laying hens)", emoji: "🐓",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert"],
    minSpaceSqFt: 40,
    difficulty: "Beginner",
    benefits: ["Fresh eggs", "Pest control", "Compost makers", "Garden tilling"],
    why: "The gateway homestead animal. Productive, low-maintenance, and forgiving for beginners. Three hens give you about 12-18 eggs a week.",
    setupLow: 400, setupHigh: 1200,
    annualLow: 200, annualHigh: 500,
    spaceText: "10-15 sq ft per bird (coop + run)",
    spacePerUnit: 12, unitName: "hen", unitNamePlural: "hens",
    suggestedMin: 3, suggestedMax: 12,
    setupPerUnit: 80, annualPerUnit: 60,
    outputPerUnit: "~5 eggs/week",
    goals: ["Self-sufficiency","Family food security","Sustainability","Hobby / recreation","Animal therapy / pets","Sell fresh meat & veg"],
    regenerative: [
      "Use a chicken tractor — a movable coop that lets hens fertilize and till one garden bed at a time, then rotate to the next.",
      "Run hens through garden beds at season's end to eat pest larvae, weed seeds, and old plants while leaving fertility behind.",
      "Compost coop bedding (deep litter method) — pine shavings + manure becomes premium garden compost in 6-12 months.",
      "Grow black soldier fly larvae or sprouted grains to cut commercial feed costs by 30-50% and recycle food waste.",
    ],
  },
  {
    name: "Ducks", emoji: "🦆",
    climates: ["Tropical","Subtropical","Temperate","Continental","Mediterranean"],
    minSpaceSqFt: 100,
    difficulty: "Beginner",
    benefits: ["Larger richer eggs", "Slug & snail control", "Hardier than chickens in wet weather"],
    why: "Excellent for damp climates where chickens struggle. Better foragers and more disease-resistant than chickens.",
    setupLow: 500, setupHigh: 1500,
    annualLow: 250, annualHigh: 600,
    spaceText: "15-25 sq ft per duck + small water source",
    spacePerUnit: 20, unitName: "duck", unitNamePlural: "ducks",
    suggestedMin: 3, suggestedMax: 10,
    setupPerUnit: 100, annualPerUnit: 75,
    outputPerUnit: "~4-5 large eggs/week",
    goals: ["Self-sufficiency","Family food security","Sustainability","Sell fresh meat & veg"],
    regenerative: [
      "Integrate ducks into orchards — they eat fallen fruit, slugs, and codling moth larvae without damaging trees.",
      "Use duck pond water to fertigate the garden — nitrogen-rich water doubles as irrigation and feed for plants.",
      "Run ducks through rice paddies or wet beds (Asian aigamo method) — they weed, fertilize, and aerate simultaneously.",
      "Set up swale-and-pond systems to capture rainwater for ducks while reducing runoff and recharging groundwater.",
    ],
  },
  {
    name: "Quail (Coturnix)", emoji: "🐦",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert"],
    minSpaceSqFt: 10,
    difficulty: "Beginner",
    benefits: ["Tiny space needs", "Eggs in 6 weeks", "Quiet (HOA friendly)", "Meat & eggs"],
    why: "Perfect for small lots, urban backyards, or even apartments. Mature in 6-8 weeks vs. 5-6 months for chickens.",
    setupLow: 150, setupHigh: 400,
    annualLow: 100, annualHigh: 250,
    spaceText: "1 sq ft per bird in cages",
    spacePerUnit: 1, unitName: "quail", unitNamePlural: "quail",
    suggestedMin: 8, suggestedMax: 30,
    setupPerUnit: 12, annualPerUnit: 10,
    outputPerUnit: "~6 eggs/week (1 chicken egg = 4 quail eggs)",
    goals: ["Self-sufficiency","Hobby / recreation","Family food security","Sell fresh meat & veg"],
    regenerative: [
      "Stack quail cages above worm bins — droppings feed the worms, and worm castings supercharge garden beds.",
      "Use quail manure (extremely concentrated) diluted 1:20 with water as a powerful liquid fertilizer for tomatoes and peppers.",
      "Grow micro-pastures of fodder (barley sprouts, wheatgrass) in trays to replace 30%+ of commercial feed.",
      "Pair quail with vertical aquaponics — their cages above fish tanks create a tight nutrient loop in tiny footprints.",
    ],
  },
  {
    name: "Honeybees", emoji: "🐝",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"],
    minSpaceSqFt: 25,
    difficulty: "Intermediate",
    benefits: ["Honey & wax", "Massive pollination boost", "Beeswax for crafts"],
    why: "Increases vegetable & fruit yields dramatically through pollination. One hive can produce 30-60 lbs of honey per year.",
    setupLow: 600, setupHigh: 1200,
    annualLow: 100, annualHigh: 300,
    spaceText: "Small footprint — mostly vertical airspace",
    spacePerUnit: 25, unitName: "hive", unitNamePlural: "hives",
    suggestedMin: 1, suggestedMax: 4,
    setupPerUnit: 700, annualPerUnit: 150,
    outputPerUnit: "30-60 lbs honey/year",
    goals: ["Self-sufficiency","Sustainability","Hobby / recreation","Sell fresh meat & veg"],
    regenerative: [
      "Plant a year-round bee forage corridor — ensure something is blooming every month from early spring to late fall.",
      "Skip chemical mite treatments where possible — use screened bottom boards, drone trapping, and breed for hygienic behavior.",
      "Leave 60+ lbs of honey per hive over winter instead of feeding sugar syrup — healthier bees, stronger genetics over time.",
      "Site hives near fruit trees, berry bushes, and squash — they boost yields 20-50% while gathering forage.",
    ],
  },
  {
    name: "Meat Rabbits", emoji: "🐰",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"],
    minSpaceSqFt: 30,
    difficulty: "Intermediate",
    benefits: ["High-protein meat", "Excellent manure (cold — no composting needed)", "Quiet & odor-free"],
    why: "Most efficient meat-to-feed ratio of any livestock. A trio (1 buck, 2 does) can produce 180+ lbs of meat annually.",
    setupLow: 300, setupHigh: 800,
    annualLow: 200, annualHigh: 450,
    spaceText: "10-12 sq ft per rabbit in hutches",
    spacePerUnit: 36, unitName: "breeding trio", unitNamePlural: "breeding trios",
    suggestedMin: 1, suggestedMax: 4,
    setupPerUnit: 250, annualPerUnit: 200,
    outputPerUnit: "~180 lbs meat/year per trio",
    goals: ["Self-sufficiency","Family food security","Sustainability","Sell fresh meat & veg"],
    regenerative: [
      "Apply rabbit manure directly to garden beds — it's 'cold' and won't burn plants, unlike chicken or cow manure.",
      "Build a rabbit-tractor (colony pasture) system — let rabbits graze rotating sections of weedy ground.",
      "Stack hutches over a worm bed or composting trench — manure drops straight down, no shoveling needed.",
      "Grow comfrey, dandelion, and willow as cut-and-carry forage — slashes feed costs and provides natural medicines.",
    ],
  },
  {
    name: "Dairy Goats", emoji: "🐐",
    climates: ["Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert","Subtropical"],
    minSpaceSqFt: 20000,
    difficulty: "Intermediate",
    benefits: ["Fresh milk daily", "Cheese & yogurt", "Brush clearing", "Companionable personalities"],
    why: "Easier to handle than cows and produce 1-3 quarts of milk per day. Need a companion — never raise just one.",
    setupLow: 1500, setupHigh: 4000,
    annualLow: 600, annualHigh: 1500,
    spaceText: "200+ sq ft shelter + 1/4 acre pasture per pair",
    spacePerUnit: 10000, unitName: "goat", unitNamePlural: "goats",
    suggestedMin: 2, suggestedMax: 6,
    setupPerUnit: 700, annualPerUnit: 400,
    outputPerUnit: "~1-3 quarts milk/day during lactation",
    goals: ["Self-sufficiency","Family food security","Sustainability","Sell fresh meat & veg"],
    regenerative: [
      "Use goats for targeted brush clearing — they eat blackberry, poison ivy, and invasives that mowers and herbicides can't touch.",
      "Implement rotational browsing — move them every 3-7 days to prevent overgrazing and let plants regrow stronger.",
      "Use goats as part of a silvopasture system — graze under fruit and nut trees for shade, fertility, and double yield per acre.",
      "Compost bedding-pack manure and use as a slow-release soil amendment that builds organic matter for years.",
    ],
  },
  {
    name: "Sheep", emoji: "🐑",
    climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain","Semi-arid"],
    minSpaceSqFt: 43560,
    difficulty: "Intermediate",
    benefits: ["Wool", "Meat", "Pasture maintenance", "Lower-maintenance than goats"],
    why: "Excellent for grazing pasture and fiber. Sheep are flock animals — minimum of 3.",
    setupLow: 1800, setupHigh: 5000,
    annualLow: 500, annualHigh: 1200,
    spaceText: "1 acre per 2-4 sheep with rotation",
    spacePerUnit: 14000, unitName: "sheep", unitNamePlural: "sheep",
    suggestedMin: 3, suggestedMax: 10,
    setupPerUnit: 500, annualPerUnit: 200,
    outputPerUnit: "~7-10 lbs wool + 50 lbs meat/year",
    goals: ["Self-sufficiency","Sustainability","Sell fresh meat & veg"],
    regenerative: [
      "Practice mob grazing — high stocking density for short periods, then long rest. Builds topsoil and sequesters carbon.",
      "Run sheep through orchards or vineyards in the off-season — they mow, fertilize, and eat fallen fruit that harbors disease.",
      "Use rotational paddocks with electric netting — one acre well-managed can outperform three acres set-stocked.",
      "Combine with cattle or chickens (multi-species grazing) — different species graze different plants and break parasite cycles.",
    ],
  },
  {
    name: "Pigs (heritage breed)", emoji: "🐖",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental"],
    minSpaceSqFt: 10000,
    difficulty: "Advanced",
    benefits: ["Massive amounts of meat", "Land clearing & tilling", "Eat scraps & forage"],
    why: "Most efficient way to convert pasture and food waste into meat. One pig yields 120-180 lbs of pork.",
    setupLow: 1200, setupHigh: 3500,
    annualLow: 600, annualHigh: 1500,
    spaceText: "1/4 acre per pig with rotation",
    spacePerUnit: 11000, unitName: "pig", unitNamePlural: "pigs",
    suggestedMin: 2, suggestedMax: 6,
    setupPerUnit: 400, annualPerUnit: 350,
    outputPerUnit: "120-180 lbs pork/pig at slaughter",
    goals: ["Self-sufficiency","Family food security","Sell fresh meat & veg"],
    regenerative: [
      "Use pigs as living tillers — let them root up new garden beds, then plant directly. No tractor or tiller needed.",
      "Practice silvopasture in oak or chestnut groves — pigs gain weight on free mast (acorns, nuts) for months.",
      "Feed all kitchen scraps, garden waste, and dairy excess — pigs are nature's recyclers and convert waste to protein.",
      "Rotate pigs through wooded areas to clear underbrush, then move on — prevents soil compaction and resets the area.",
    ],
  },
  {
    name: "Dairy Cow", emoji: "🐄",
    climates: ["Temperate","Continental","Mediterranean","Subtropical"],
    minSpaceSqFt: 87120,
    difficulty: "Advanced",
    benefits: ["3-6 gallons milk daily", "Butter, cheese, cream", "Manure for fertility"],
    why: "Significant commitment but unmatched dairy production. Family cow can supply all dairy for a household with surplus.",
    setupLow: 3000, setupHigh: 8000,
    annualLow: 1500, annualHigh: 4000,
    spaceText: "2-5 acres with rotation",
    spacePerUnit: 130000, unitName: "cow", unitNamePlural: "cows",
    suggestedMin: 1, suggestedMax: 3,
    setupPerUnit: 4000, annualPerUnit: 2000,
    outputPerUnit: "3-6 gallons milk/day during lactation",
    goals: ["Self-sufficiency","Family food security","Sell fresh meat & veg"],
    regenerative: [
      "Adopt adaptive multi-paddock (AMP) grazing — moves cows daily across small paddocks to mimic wild herd patterns and rebuild soil.",
      "Use the cow as a soil-building machine — rotational grazing on diverse pasture sequesters more carbon than a forest, acre for acre.",
      "Compost manure with bedding for premium fertilizer, or apply directly via 'pat scattering' across pasture.",
      "Skip grain feeding — 100% grass-fed cows produce more nutrient-dense milk and eliminate dependency on commercial feed.",
    ],
  },
  {
    name: "Beef Cattle", emoji: "🐂",
    climates: ["Temperate","Continental","Mediterranean","Subtropical","Semi-arid"],
    minSpaceSqFt: 87120,
    difficulty: "Advanced",
    benefits: ["Hundreds of lbs of meat", "Soil-building grazers", "Hide & tallow"],
    why: "Heritage breeds like Highland and Devon thrive on grass alone. One steer yields 400-500 lbs of butchered beef.",
    setupLow: 2000, setupHigh: 5000,
    annualLow: 800, annualHigh: 2500,
    spaceText: "2-5 acres per animal with rotation",
    spacePerUnit: 130000, unitName: "steer", unitNamePlural: "cattle",
    suggestedMin: 1, suggestedMax: 4,
    setupPerUnit: 2500, annualPerUnit: 1500,
    outputPerUnit: "400-500 lbs beef per steer at 18-24 months",
    goals: ["Self-sufficiency","Family food security","Sell fresh meat & veg"],
    regenerative: [
      "Use mob grazing to mimic wild bison herds — high density for 1 day, then 60+ days rest. Builds topsoil rapidly.",
      "Skip the feedlot finish — grass-finished beef is healthier and supports pasture-based ecosystems.",
      "Rotate cattle ahead of chickens (Joel Salatin's 'eggmobile' system) — chickens spread manure pats and eat fly larvae.",
      "Choose heritage breeds (Devon, Highland, Galloway) that thrive on grass alone, no supplemental grain needed.",
    ],
  },
  {
    name: "Turkeys (heritage)", emoji: "🦃",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"],
    minSpaceSqFt: 200,
    difficulty: "Intermediate",
    benefits: ["Holiday meat", "Pasture foragers", "Insect control", "Rich dark meat"],
    why: "Heritage turkeys (Bourbon Red, Narragansett) forage 50%+ of their diet, breed naturally, and finish at 18-25 lbs in 6-7 months.",
    setupLow: 400, setupHigh: 1200,
    annualLow: 200, annualHigh: 600,
    spaceText: "20-30 sq ft per turkey + pasture",
    spacePerUnit: 25, unitName: "turkey", unitNamePlural: "turkeys",
    suggestedMin: 4, suggestedMax: 12,
    setupPerUnit: 80, annualPerUnit: 60,
    outputPerUnit: "18-25 lb dressed bird per turkey",
    goals: ["Self-sufficiency","Family food security","Sustainability","Sell fresh meat & veg"],
    regenerative: [
      "Run heritage turkeys through orchards to eat fallen fruit and pest insects — natural pest control plus free forage.",
      "Save breeding stock from your healthiest birds — heritage breeds reproduce naturally, unlike industrial broad-breasted whites.",
      "Use turkey manure (high in phosphorus) as targeted fertilizer for fruit trees and berry bushes.",
    ],
  },
  {
    name: "Geese", emoji: "🪿",
    climates: ["Temperate","Continental","Mediterranean","Alpine/Mountain","Subtropical"],
    minSpaceSqFt: 400,
    difficulty: "Intermediate",
    benefits: ["Living lawnmowers", "Excellent guard birds", "Rich eggs", "Down & feathers"],
    why: "Geese eat almost entirely grass — they're the cheapest meat bird to raise on pasture. Also excellent watchdogs for predator alerts.",
    setupLow: 350, setupHigh: 900,
    annualLow: 100, annualHigh: 300,
    spaceText: "30-40 sq ft + grass pasture per goose",
    spacePerUnit: 35, unitName: "goose", unitNamePlural: "geese",
    suggestedMin: 2, suggestedMax: 8,
    setupPerUnit: 120, annualPerUnit: 50,
    outputPerUnit: "20-40 large eggs/year + 8-15 lb meat",
    goals: ["Self-sufficiency","Family food security","Sustainability","Sell fresh meat & veg"],
    regenerative: [
      "Use geese for weed control in orchards and vineyards — they eat grass and weeds but ignore woody plants like vines and trees.",
      "Geese self-incubate and raise their goslings — no incubator or brooder needed, fully closed-loop reproduction.",
      "Pair geese with chickens — geese guard the flock from aerial predators like hawks.",
    ],
  },
  {
    name: "Guinea Fowl", emoji: "🐓",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert"],
    minSpaceSqFt: 100,
    difficulty: "Beginner",
    benefits: ["Tick & pest control", "Watchdog alarm", "Nearly free-range diet", "Lean meat"],
    why: "The best tick-eliminator on a homestead — a flock of 12 can clear ticks from 5 acres. Mostly self-feeding from foraging.",
    setupLow: 250, setupHigh: 600,
    annualLow: 80, annualHigh: 200,
    spaceText: "Forage range — 2 sq ft of coop space at night",
    spacePerUnit: 4, unitName: "guinea", unitNamePlural: "guineas",
    suggestedMin: 6, suggestedMax: 20,
    setupPerUnit: 25, annualPerUnit: 15,
    outputPerUnit: "60-100 eggs/year (seasonal layer)",
    goals: ["Self-sufficiency","Sustainability","Sell fresh meat & veg"],
    regenerative: [
      "Use guineas instead of pesticides for tick control — they devour ticks, beetles, and grasshoppers without scratching gardens.",
      "Allow guineas to free-range across the entire property — they patrol for pests and require minimal supplemental feed.",
      "Let broody hens hatch keets naturally — guineas are flighty parents but chickens make excellent surrogate mothers.",
    ],
  },
  {
    name: "Meat Chickens (Cornish Cross)", emoji: "🐔",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert"],
    minSpaceSqFt: 60,
    difficulty: "Beginner",
    benefits: ["Fast meat (8 weeks)", "High feed-to-meat conversion", "Easy to butcher"],
    why: "Industry standard for fast-growing meat birds. Ready to butcher in just 8 weeks at 5-6 lbs dressed weight.",
    setupLow: 300, setupHigh: 800,
    annualLow: 250, annualHigh: 600,
    spaceText: "2-4 sq ft per bird in chicken tractor",
    spacePerUnit: 3, unitName: "broiler", unitNamePlural: "broilers",
    suggestedMin: 10, suggestedMax: 50,
    setupPerUnit: 12, annualPerUnit: 18,
    outputPerUnit: "5-6 lb dressed bird in 8 weeks",
    goals: ["Self-sufficiency","Family food security","Sell fresh meat & veg"],
    regenerative: [
      "Use Joel Salatin-style chicken tractors that move daily across pasture — fertilizes evenly without overloading any single spot.",
      "Consider slower-growing heritage broilers (Freedom Rangers, Red Rangers) for better flavor, hardier birds, and pastured systems.",
      "Process on-site if regulations allow — eliminates transport, captures all offal/feathers/blood for compost.",
    ],
  },
  {
    name: "Alpacas", emoji: "🦙",
    climates: ["Temperate","Continental","Mediterranean","Alpine/Mountain","Semi-arid"],
    minSpaceSqFt: 21780,
    difficulty: "Intermediate",
    benefits: ["Premium fiber (fleece)", "Gentle disposition", "Light on pasture", "Compact manure"],
    why: "Hardy fiber animals that produce 5-10 lbs of valuable wool per year. Need a herd of at least 3.",
    setupLow: 2500, setupHigh: 7000,
    annualLow: 600, annualHigh: 1500,
    spaceText: "5-8 alpacas per acre with rotation",
    spacePerUnit: 7000, unitName: "alpaca", unitNamePlural: "alpacas",
    suggestedMin: 3, suggestedMax: 8,
    setupPerUnit: 1500, annualPerUnit: 350,
    outputPerUnit: "5-10 lbs fleece/year (worth $50-200/lb)",
    goals: ["Sustainability","Hobby / recreation","Sell fresh meat & veg"],
    regenerative: [
      "Alpaca manure (called 'beans') is a low-odor, slow-release fertilizer that can be applied directly to gardens without composting.",
      "Their soft padded feet (vs. hooves) cause minimal pasture damage — ideal for sensitive soil systems.",
      "Co-graze with sheep or goats for parasite-cycle disruption and complementary forage use.",
    ],
  },
  {
    name: "Llamas", emoji: "🦙",
    climates: ["Temperate","Continental","Mediterranean","Alpine/Mountain","Semi-arid","Arid/Desert"],
    minSpaceSqFt: 21780,
    difficulty: "Intermediate",
    benefits: ["Livestock guardian", "Pack animal", "Fiber", "Drought-tolerant"],
    why: "Larger relatives of alpacas that double as guardians for sheep and goats — they'll chase off coyotes and dogs.",
    setupLow: 1500, setupHigh: 5000,
    annualLow: 400, annualHigh: 1000,
    spaceText: "3-5 llamas per acre with rotation",
    spacePerUnit: 7000, unitName: "llama", unitNamePlural: "llamas",
    suggestedMin: 2, suggestedMax: 6,
    setupPerUnit: 1000, annualPerUnit: 250,
    outputPerUnit: "3-7 lbs fleece + guardian services",
    goals: ["Sustainability","Hobby / recreation","Animal therapy / pets"],
    regenerative: [
      "Use a single gelded llama as a livestock guardian — protects sheep/goats from predators without needing dogs.",
      "Llamas are extremely water-efficient — ideal for dryland and Mediterranean homesteads with limited water.",
      "Their dung piles (communal latrines) make manure collection effortless — gather and apply directly to gardens.",
    ],
  },
  {
    name: "Worm Bin (composting)", emoji: "🪱",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert","Alpine/Mountain"],
    minSpaceSqFt: 4,
    difficulty: "Beginner",
    benefits: ["Premium fertilizer", "Recycles food scraps", "Indoor or outdoor", "Almost zero maintenance"],
    why: "Red wigglers (Eisenia fetida) turn kitchen scraps into the world's best fertilizer. Works in apartments, garages, basements.",
    setupLow: 60, setupHigh: 200,
    annualLow: 0, annualHigh: 50,
    spaceText: "1 sq ft per bin (indoor or outdoor)",
    spacePerUnit: 4, unitName: "bin", unitNamePlural: "bins",
    suggestedMin: 1, suggestedMax: 4,
    setupPerUnit: 80, annualPerUnit: 20,
    outputPerUnit: "20-40 lbs castings/year + worm tea",
    goals: ["Self-sufficiency","Sustainability","Hobby / recreation"],
    regenerative: [
      "Worm castings are 5-11x more nutrient-dense than regular compost — a tablespoon per seedling provides slow-release fertility.",
      "Brew 'worm tea' (steep castings in water 24 hours) as a foliar spray that boosts plant immunity and pest resistance.",
      "Pair with rabbits or quail — their manure feeds worms directly with zero composting time.",
    ],
  },
  {
    name: "Mason Bees", emoji: "🐝",
    climates: ["Temperate","Continental","Mediterranean","Alpine/Mountain","Subtropical"],
    minSpaceSqFt: 1,
    difficulty: "Beginner",
    benefits: ["100x more efficient than honeybees at pollination", "Solitary (no stings)", "No hive maintenance"],
    why: "Native solitary bees that are dramatically better orchard pollinators than honeybees. No honey, but no maintenance either.",
    setupLow: 30, setupHigh: 100,
    annualLow: 10, annualHigh: 40,
    spaceText: "Tiny — just hang a nesting block",
    spacePerUnit: 1, unitName: "nesting block", unitNamePlural: "nesting blocks",
    suggestedMin: 1, suggestedMax: 5,
    setupPerUnit: 40, annualPerUnit: 15,
    outputPerUnit: "Pollinates ~1500 flowers/day per bee",
    goals: ["Self-sufficiency","Sustainability","Hobby / recreation","Pollinator garden"],
    regenerative: [
      "Plant early-blooming species (willow, fruit trees, dandelion) to support emerging mason bees in early spring.",
      "Replace nesting tubes annually to prevent mite buildup — sustainable native bee keeping with zero chemicals.",
      "Combine with honeybees for full-spectrum pollination — mason bees handle early spring while honeybees focus on summer.",
    ],
  },
  {
    name: "Ducks (meat — Pekin)", emoji: "🦆",
    climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental"],
    minSpaceSqFt: 80,
    difficulty: "Beginner",
    benefits: ["Fast meat (7-9 weeks)", "Rich, flavorful meat", "Disease-resistant", "Foragers"],
    why: "Pekin ducks reach 6-8 lbs in 7-9 weeks. Far hardier than meat chickens and excel in wet climates.",
    setupLow: 300, setupHigh: 800,
    annualLow: 200, annualHigh: 500,
    spaceText: "10-15 sq ft per duck",
    spacePerUnit: 12, unitName: "duck", unitNamePlural: "ducks",
    suggestedMin: 6, suggestedMax: 20,
    setupPerUnit: 25, annualPerUnit: 25,
    outputPerUnit: "6-8 lb duck in 7-9 weeks",
    goals: ["Self-sufficiency","Family food security","Sell fresh meat & veg"],
    regenerative: [
      "Run pekin ducks on irrigation ditches and seasonal wetlands — they thrive where chickens can't and need no special housing.",
      "Use Muscovy ducks instead of Pekin for fly control — they consume up to 100 flies per minute.",
      "Render duck fat into schmaltz/lard — replaces store-bought cooking oil and stores for 6+ months.",
    ],
  },
  {
    name: "Donkey (mini or standard)", emoji: "🫏",
    climates: ["Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert","Subtropical"],
    minSpaceSqFt: 21780,
    difficulty: "Intermediate",
    benefits: ["Livestock guardian", "Pack/work animal", "Long-lived (30-40 yrs)", "Easy keepers"],
    why: "Excellent livestock guardians — naturally aggressive toward dogs, coyotes, and foxes. Cheap to feed and live for decades.",
    setupLow: 1000, setupHigh: 3500,
    annualLow: 400, annualHigh: 900,
    spaceText: "1/2 acre per donkey with rotation",
    spacePerUnit: 14000, unitName: "donkey", unitNamePlural: "donkeys",
    suggestedMin: 1, suggestedMax: 3,
    setupPerUnit: 1500, annualPerUnit: 500,
    outputPerUnit: "Predator protection + pack capacity",
    goals: ["Sustainability","Animal therapy / pets","Hobby / recreation"],
    regenerative: [
      "A single donkey can guard a flock of sheep or goats up to 25 head — eliminates need for guardian dogs and their feed costs.",
      "Donkeys are extremely water- and feed-efficient — they thrive on rough forage that other livestock won't eat.",
      "Use as pack animals for moving compost, mulch, harvest — eliminates need for ATVs or tractors on smaller properties.",
    ],
  },
];

// Weekly/batch production specs keyed by animal name.
// type "weekly"  → getWeekly(count) returns per-week output string
// type "annual"  → getWeekly(count) returns per-year total
// type "batch"   → getWeekly(count) returns per-slaughter/per-batch yield
// type "service" → non-food output
const ANIMAL_PRODUCTION_LOOKUP = {
  "Chickens (laying hens)": { type: "weekly",
    getWeekly: (n) => `${n * 4}–${n * 5} eggs`,
    note: "~4–5 eggs/hen/week" },
  "Ducks": { type: "weekly",
    getWeekly: (n) => `${n * 4}–${n * 5} large eggs`,
    note: "~4–5 eggs/duck/week" },
  "Quail (Coturnix)": { type: "weekly",
    getWeekly: (n) => `${n * 5}–${n * 6} quail eggs`,
    note: "~5–6 eggs/quail/week" },
  "Honeybees": { type: "annual",
    getWeekly: (n) => `${Math.round(n*30/52*10)/10}–${Math.round(n*60/52*10)/10} lbs honey`,
    note: "30–60 lbs/hive/year" },
  "Meat Rabbits": { type: "annual",
    getWeekly: (n) => `~${Math.round(n*175/52*10)/10} lbs meat`,
    note: "~180 lbs/year per trio" },
  "Dairy Goats": { type: "weekly",
    getWeekly: (n) => `${n * 7}–${n * 21} qts milk`,
    note: "1–3 qts/doe/day (lactating)" },
  "Sheep": { type: "annual",
    getWeekly: (n) => `${n * 7}–${n * 10} lbs wool`,
    note: "7–10 lbs wool/sheep at shearing" },
  "Pigs (heritage breed)": { type: "batch",
    getWeekly: (n) => `${n * 120}–${n * 180} lbs pork`,
    note: "per pig at slaughter" },
  "Dairy Cow": { type: "weekly",
    getWeekly: (n) => `${n * 21}–${n * 42} gal milk`,
    note: "3–6 gal/cow/day (lactating)" },
  "Beef Cattle": { type: "batch",
    getWeekly: (n) => `${n * 400}–${n * 500} lbs beef`,
    note: "per steer at 18–24 months" },
  "Turkeys (heritage)": { type: "batch",
    getWeekly: (n) => `${n * 18}–${n * 25} lbs meat`,
    note: "per turkey at slaughter (6–7 months)" },
  "Geese": { type: "annual",
    getWeekly: (n) => `${Math.round(n*20/52*10)/10}–${Math.round(n*40/52*10)/10} large eggs`,
    note: "20–40 eggs/year, seasonal layer" },
  "Guinea Fowl": { type: "annual",
    getWeekly: (n) => `${Math.round(n*60/52*10)/10}–${Math.round(n*100/52*10)/10} eggs`,
    note: "60–100 eggs/year, seasonal" },
  "Meat Chickens (Cornish Cross)": { type: "batch",
    getWeekly: (n) => `${n * 5}–${n * 6} lbs meat`,
    note: "per bird per batch, ready in 8 weeks" },
  "Alpacas": { type: "annual",
    getWeekly: (n) => `${n * 5}–${n * 10} lbs fleece`,
    note: "5–10 lbs/alpaca at annual shearing" },
  "Llamas": { type: "annual",
    getWeekly: (n) => `${n * 3}–${n * 7} lbs fleece`,
    note: "3–7 lbs/llama at annual shearing" },
  "Worm Bin (composting)": { type: "weekly",
    getWeekly: (n) => `${Math.round(n*20/52*10)/10}–${Math.round(n*40/52*10)/10} lbs castings`,
    note: "20–40 lbs/bin/year" },
  "Mason Bees": { type: "service",
    getWeekly: () => "Pollination service",
    note: "~1,500 flowers/day/bee — boosts fruit & veggie yields 20–50%" },
  "Ducks (meat — Pekin)": { type: "batch",
    getWeekly: (n) => `${n * 6}–${n * 8} lbs meat`,
    note: "per duck at slaughter (7–9 weeks)" },
  "Donkey (mini or standard)": { type: "service",
    getWeekly: () => "Predator protection",
    note: "Guards up to 25 head of livestock" },
};

// Market income data for animals. annualUnits(count) → sellable units/year.
const ANIMAL_MARKET = {
  "Chickens (laying hens)":     { product:"Farm-fresh eggs",        priceMin:4,   priceMax:7,   priceUnit:"doz",        annualUnits:(n)=>Math.round(n*260/12), unitsLabel:"doz/yr", minToSell:6,  period:"per year", note:"Roadside stand or farmers market. Pullet eggs sell out fast in spring." },
  "Ducks":                      { product:"Duck eggs (premium)",     priceMin:7,   priceMax:12,  priceUnit:"doz",        annualUnits:(n)=>Math.round(n*234/12), unitsLabel:"doz/yr", minToSell:6,  period:"per year", note:"Duck eggs command 2× chicken egg price. Bakers pay premium." },
  "Quail (Coturnix)":           { product:"Quail eggs",             priceMin:3,   priceMax:5,   priceUnit:"doz",        annualUnits:(n)=>Math.round(n*312/12), unitsLabel:"doz/yr", minToSell:12, period:"per year", note:"Sell to Asian grocers and upscale restaurants for best margin." },
  "Honeybees":                  { product:"Raw local honey",         priceMin:8,   priceMax:18,  priceUnit:"lb",         annualUnits:(n)=>Math.round(n*45),     unitsLabel:"lbs/yr", minToSell:2,  period:"per year", note:"Add beeswax candles and lip balm for higher margins at market." },
  "Meat Rabbits":               { product:"Rabbit (processed)",      priceMin:8,   priceMax:14,  priceUnit:"lb",         annualUnits:(n)=>Math.round(n*170),    unitsLabel:"lbs/yr", minToSell:1,  period:"per year", note:"Sell to restaurants and farmers markets. High margins for niche meat." },
  "Dairy Goats":                { product:"Fresh goat milk",         priceMin:8,   priceMax:15,  priceUnit:"qt",         annualUnits:(n)=>Math.round(n*560),    unitsLabel:"qts/yr", minToSell:2,  period:"per year", note:"Raw milk sales vary by state — herdshare agreements are legal in most." },
  "Sheep":                      { product:"Wool + lamb",             priceMin:2,   priceMax:5,   priceUnit:"lb wool",    annualUnits:(n)=>Math.round(n*8.5),    unitsLabel:"lbs wool/yr", minToSell:3, period:"per year", note:"Processed roving or yarn earns $25-50/lb. Lambs add $400-600/head." },
  "Pigs (heritage breed)":      { product:"Pastured pork",           priceMin:8,   priceMax:15,  priceUnit:"lb (HW)",    annualUnits:(n)=>Math.round(n*150),    unitsLabel:"lbs/pig", minToSell:1, period:"per pig",  note:"Sell half/whole hogs direct-to-consumer. Simplest path to cash flow." },
  "Dairy Cow":                  { product:"Fresh whole milk",        priceMin:8,   priceMax:15,  priceUnit:"gal",        annualUnits:(n)=>Math.round(n*1260),   unitsLabel:"gals/yr", minToSell:1, period:"per year", note:"Herdshare model works in most states. Value-add as butter or cheese." },
  "Beef Cattle":                { product:"Grass-fed beef",          priceMin:8,   priceMax:16,  priceUnit:"lb (HW)",    annualUnits:(n)=>Math.round(n*450),    unitsLabel:"lbs/steer", minToSell:1, period:"per steer", note:"Sell quarter/half/whole beeves direct. Grass-fed commands 2-3× commodity." },
  "Turkeys (heritage)":         { product:"Heritage turkey",         priceMin:6,   priceMax:12,  priceUnit:"lb dressed", annualUnits:(n)=>Math.round(n*21.5),   unitsLabel:"lbs/bird", minToSell:4, period:"per bird", note:"Pre-orders for Thanksgiving bring $150-300/bird. Start taking deposits in summer." },
  "Geese":                      { product:"Goose eggs + meat",       priceMin:2,   priceMax:4,   priceUnit:"egg",        annualUnits:(n)=>Math.round(n*30),     unitsLabel:"eggs/yr", minToSell:4, period:"per year", note:"Goose meat commands premium at Christmas. Eggs sell to bakers for $3-5 each." },
  "Guinea Fowl":                { product:"Guinea eggs + meat",      priceMin:1,   priceMax:2,   priceUnit:"egg",        annualUnits:(n)=>Math.round(n*80),     unitsLabel:"eggs/yr", minToSell:8, period:"per year", note:"Live tick-control birds sell for $15-30 each — often more profitable." },
  "Meat Chickens (Cornish Cross)":{ product:"Pastured broiler",      priceMin:4,   priceMax:8,   priceUnit:"lb dressed", annualUnits:(n)=>Math.round(n*5.5),    unitsLabel:"lbs/bird", minToSell:25, period:"per batch", note:"Run 4-5 batches/year. Sell $18-40/bird at farmers market or pre-order." },
  "Alpacas":                    { product:"Raw alpaca fiber",        priceMin:50,  priceMax:150, priceUnit:"lb",         annualUnits:(n)=>Math.round(n*7.5),    unitsLabel:"lbs/yr", minToSell:3, period:"per year", note:"Handspinners pay premium for raw or processed fiber. Sell on Etsy & at fiber festivals." },
  "Llamas":                     { product:"Llama fiber",             priceMin:15,  priceMax:30,  priceUnit:"lb",         annualUnits:(n)=>Math.round(n*5),      unitsLabel:"lbs/yr", minToSell:2, period:"per year", note:"Coarser than alpaca but still sought by hand-spinners. Also rent as pack animals." },
  "Worm Bin (composting)":      { product:"Worm castings",           priceMin:2,   priceMax:5,   priceUnit:"lb",         annualUnits:(n)=>Math.round(n*30),     unitsLabel:"lbs/yr", minToSell:2, period:"per year", note:"Sell to gardeners, grow shops, and nurseries. Low overhead, steady local demand." },
  "Ducks (meat — Pekin)":       { product:"Duck meat (Pekin)",       priceMin:5,   priceMax:9,   priceUnit:"lb dressed", annualUnits:(n)=>Math.round(n*7),      unitsLabel:"lbs/bird", minToSell:10, period:"per batch", note:"Strong demand at Asian markets and upscale restaurants. 3-4 batches/year." },
};

// Market income data for vegetables. Annual income is for a "standard homestead planting" of that crop.
const VEG_MARKET = {
  "Tomatoes":                    { priceMin:2.50, priceMax:4.50, priceUnit:"/lb",    basis:"per 6-plant bed",              annualIncomeLow:150, annualIncomeHigh:810,  note:"Heirloom & cherry varieties command $4-6/lb" },
  "Zucchini & Summer Squash":    { priceMin:1.50, priceMax:2.50, priceUnit:"/lb",    basis:"per 3 plants",                 annualIncomeLow:90,  annualIncomeHigh:300,  note:"Sell baby zucchini to restaurants at $3-4/lb" },
  "Lettuce & Salad Greens":      { priceMin:4,    priceMax:8,    priceUnit:"/lb",    basis:"per 32 sq ft, multi-harvest",  annualIncomeLow:80,  annualIncomeHigh:250,  note:"Mesclun mix bags sell for $6-12 at market" },
  "Beans (bush & pole)":         { priceMin:2,    priceMax:4,    priceUnit:"/lb",    basis:"per 20-plant row",             annualIncomeLow:30,  annualIncomeHigh:160,  note:"Dry beans store well; sell at $3-5/lb" },
  "Garlic":                      { priceMin:6,    priceMax:14,   priceUnit:"/lb",    basis:"per 50-head bed",              annualIncomeLow:120, annualIncomeHigh:500,  note:"Hardneck varieties premium; scapes also sell well in spring" },
  "Potatoes":                    { priceMin:1.50, priceMax:3.50, priceUnit:"/lb",    basis:"per 10-ft row",                annualIncomeLow:60,  annualIncomeHigh:210,  note:"Fingerlings & colored varieties command $3-5/lb" },
  "Sweet Corn":                  { priceMin:0.50, priceMax:1.50, priceUnit:"/ear",   basis:"per 100-stalk patch",          annualIncomeLow:100, annualIncomeHigh:450,  note:"Sell fresh by the dozen or as bundled bags" },
  "Cucumbers":                   { priceMin:1,    priceMax:2.50, priceUnit:"/lb",    basis:"per 6 plants",                 annualIncomeLow:60,  annualIncomeHigh:250,  note:"Pickling cucumbers sell to restaurants at premium" },
  "Peppers":                     { priceMin:2,    priceMax:5,    priceUnit:"/lb",    basis:"per 8 plants",                 annualIncomeLow:80,  annualIncomeHigh:480,  note:"Hot & specialty varieties command $4-8/lb" },
  "Kale & Chard":                { priceMin:3,    priceMax:6,    priceUnit:"/lb",    basis:"per 10 plants",                annualIncomeLow:90,  annualIncomeHigh:400,  note:"Cut-and-come-again for months of harvests" },
  "Winter Squash":               { priceMin:1,    priceMax:3,    priceUnit:"/lb",    basis:"per 4 plants",                 annualIncomeLow:80,  annualIncomeHigh:360,  note:"Stores well — sell fall through spring" },
  "Pumpkins":                    { priceMin:4,    priceMax:15,   priceUnit:"/each",  basis:"per 4 plants",                 annualIncomeLow:48,  annualIncomeHigh:480,  note:"Decorative varieties earn $10-25 at fall farm stands" },
  "Strawberries":                { priceMin:4,    priceMax:8,    priceUnit:"/lb",    basis:"per 25-plant bed",             annualIncomeLow:100, annualIncomeHigh:400,  note:"U-pick pricing at $3-5/lb reduces harvest labor" },
  "Raspberries & Blackberries":  { priceMin:5,    priceMax:10,   priceUnit:"/pint",  basis:"per 8 canes",                  annualIncomeLow:80,  annualIncomeHigh:320,  note:"Highest $/sq ft of any fruit at farmers markets" },
  "Blueberries":                 { priceMin:4,    priceMax:8,    priceUnit:"/lb",    basis:"per 4 mature bushes",          annualIncomeLow:64,  annualIncomeHigh:320,  note:"U-pick premium; takes 3-4 years to full production" },
  "Asparagus":                   { priceMin:4,    priceMax:8,    priceUnit:"/lb",    basis:"per 25-crown bed (mature)",    annualIncomeLow:50,  annualIncomeHigh:200,  note:"Perennial — pays off for 20+ years once established" },
  "Herbs (culinary mix)":        { priceMin:3,    priceMax:6,    priceUnit:"/bunch", basis:"per 4 sq ft, multi-harvest",   annualIncomeLow:120, annualIncomeHigh:600,  note:"Best $/sq ft of any crop — bundle into $5-8 herb bouquets" },
  "Lavender":                    { priceMin:4,    priceMax:10,   priceUnit:"/bunch", basis:"per 10 plants",                annualIncomeLow:160, annualIncomeHigh:800,  note:"Dried bundles, sachets, essential oil — multiple revenue streams" },
  "Sunflowers":                  { priceMin:1.50, priceMax:4,    priceUnit:"/stem",  basis:"per 50-plant row",             annualIncomeLow:75,  annualIncomeHigh:400,  note:"Cut flower add-on stream — pairs well with veggie CSA shares" },
  "Medicinal Herbs":             { priceMin:5,    priceMax:15,   priceUnit:"/oz dry",basis:"per 20 sq ft bed",             annualIncomeLow:200, annualIncomeHigh:900,  note:"Echinacea, elderberry, valerian — high-value niche market" },
  "Cabbage & Brassicas":         { priceMin:1.50, priceMax:4,    priceUnit:"/head",  basis:"per 12 plants",                annualIncomeLow:36,  annualIncomeHigh:192,  note:"Fermented as kraut or kimchi adds significant value-add margin" },
  "Onions":                      { priceMin:1,    priceMax:2.50, priceUnit:"/lb",    basis:"per 100-plant bed",            annualIncomeLow:50,  annualIncomeHigh:250,  note:"Long storage — sell through winter when supply is scarce" },
};

// Vegetables with seasonal planting windows.
// plantMonths/harvestMonths use Northern Hemisphere months (1=Jan, 12=Dec).
// Two profiles: "cool" (Temperate/Continental/Alpine) and "warm" (Tropical/Subtropical/Mediterranean/Arid/Semi-arid).
const VEGETABLES = [
  { name: "Tomatoes", emoji: "🍅", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"], season: "Late spring to fall", difficulty: "Beginner", yield: "10-30 lbs per plant", costLow: 4, costHigh: 12, why: "The cornerstone of any food garden — high yield in small space, endless culinary uses, and easy to preserve.",
    plantMonths: { cool: [5,6], warm: [3,4] }, harvestMonths: { cool: [7,8,9], warm: [6,7,8,9,10] } },
  { name: "Zucchini & Summer Squash", emoji: "🥒", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"], season: "Summer", difficulty: "Beginner", yield: "20-40 lbs per plant", costLow: 3, costHigh: 8, why: "Almost impossible to fail at. One or two plants will overwhelm a family.",
    plantMonths: { cool: [5,6], warm: [3,4,8] }, harvestMonths: { cool: [7,8,9], warm: [5,6,7,10,11] } },
  { name: "Lettuce & Salad Greens", emoji: "🥬", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring & fall (cool seasons)", difficulty: "Beginner", yield: "1-2 lbs per sq ft", costLow: 3, costHigh: 10, why: "Fast-growing (30 days), can be cut-and-come-again, and thrives in containers or small beds.",
    plantMonths: { cool: [3,4,8,9], warm: [10,11,1,2] }, harvestMonths: { cool: [4,5,6,9,10], warm: [11,12,1,2,3] } },
  { name: "Beans (bush & pole)", emoji: "🫘", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"], season: "Late spring to summer", difficulty: "Beginner", yield: "1/2 lb per plant (bush), 2 lbs (pole)", costLow: 3, costHigh: 8, why: "Fix nitrogen in your soil, easy to grow, and dry beans store for years.",
    plantMonths: { cool: [5,6], warm: [3,4,8,9] }, harvestMonths: { cool: [7,8,9], warm: [5,6,7,10,11] } },
  { name: "Garlic", emoji: "🧄", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain","Semi-arid"], season: "Plant fall, harvest summer", difficulty: "Beginner", yield: "1 head per clove planted", costLow: 10, costHigh: 25, why: "Plant once in fall, ignore until summer. Stores for 6+ months and is a kitchen staple.",
    plantMonths: { cool: [10,11], warm: [10,11] }, harvestMonths: { cool: [6,7], warm: [5,6] } },
  { name: "Potatoes", emoji: "🥔", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain","Subtropical"], season: "Spring planting", difficulty: "Beginner", yield: "5-10 lbs per plant", costLow: 15, costHigh: 40, why: "Calorie-dense staple crop. Can be grown in towers, bags, or trenches.",
    plantMonths: { cool: [3,4,5], warm: [2,3] }, harvestMonths: { cool: [7,8,9], warm: [6,7] } },
  { name: "Kale & Collards", emoji: "🥬", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring & fall, winters in mild areas", difficulty: "Beginner", yield: "2-3 lbs per plant", costLow: 3, costHigh: 8, why: "Cold-hardy down to 20°F, productive for months, packed with nutrition.",
    plantMonths: { cool: [3,4,8], warm: [9,10,2] }, harvestMonths: { cool: [5,6,7,9,10,11], warm: [11,12,1,2,3,4] } },
  { name: "Cucumbers", emoji: "🥒", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"], season: "Summer", difficulty: "Beginner", yield: "10-20 lbs per plant", costLow: 4, costHigh: 10, why: "Trellis them to save space. Excellent for fresh eating and pickling.",
    plantMonths: { cool: [5,6], warm: [3,4] }, harvestMonths: { cool: [7,8,9], warm: [5,6,7,8] } },
  { name: "Peppers (sweet & hot)", emoji: "🌶️", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert"], season: "Summer", difficulty: "Intermediate", yield: "5-10 lbs per plant", costLow: 4, costHigh: 12, why: "Productive all season once established. Hot peppers can be dried or fermented.",
    plantMonths: { cool: [5,6], warm: [3,4] }, harvestMonths: { cool: [7,8,9,10], warm: [6,7,8,9,10] } },
  { name: "Carrots", emoji: "🥕", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain","Subtropical"], season: "Spring & fall", difficulty: "Intermediate", yield: "1 lb per sq ft", costLow: 3, costHigh: 8, why: "Need loose soil but otherwise low-maintenance. Store well in cold storage.",
    plantMonths: { cool: [3,4,7,8], warm: [9,10,2] }, harvestMonths: { cool: [6,7,9,10,11], warm: [11,12,1,4,5] } },
  { name: "Onions", emoji: "🧅", climates: ["Mediterranean","Temperate","Continental","Subtropical","Semi-arid"], season: "Spring planting (fall in warm zones)", difficulty: "Intermediate", yield: "1-2 lbs per sq ft", costLow: 10, costHigh: 25, why: "Long-storing kitchen essential. Plant once and harvest months later.",
    plantMonths: { cool: [3,4], warm: [10,11] }, harvestMonths: { cool: [7,8], warm: [4,5,6] } },
  { name: "Sweet Potatoes", emoji: "🍠", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Semi-arid"], season: "Long warm season (90-120 days)", difficulty: "Intermediate", yield: "3-6 lbs per plant", costLow: 15, costHigh: 35, why: "Heat-loving and drought-tolerant. Stores for months without refrigeration.",
    plantMonths: { cool: [5,6], warm: [3,4,5] }, harvestMonths: { cool: [9,10], warm: [7,8,9,10] } },
  { name: "Winter Squash & Pumpkins", emoji: "🎃", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"], season: "Summer to fall", difficulty: "Intermediate", yield: "3-5 fruits per plant", costLow: 4, costHigh: 12, why: "Long storage life (3-6 months). Need space to sprawl but feed a family for months.",
    plantMonths: { cool: [5,6], warm: [4,5] }, harvestMonths: { cool: [9,10], warm: [8,9,10] } },
  { name: "Strawberries", emoji: "🍓", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring/summer; perennial", difficulty: "Beginner", yield: "1 lb per plant", costLow: 20, costHigh: 60, why: "Perennial — plant once, harvest for years. Multiplies via runners.",
    plantMonths: { cool: [4,5], warm: [10,11,2,3] }, harvestMonths: { cool: [5,6,7], warm: [3,4,5,6] } },
  { name: "Blueberries", emoji: "🫐", climates: ["Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Summer; perennial bushes", difficulty: "Intermediate", yield: "5-10 lbs per mature bush", costLow: 50, costHigh: 200, why: "Long-lived bushes (20+ years). Need acidic soil. High-value crop.",
    plantMonths: { cool: [3,4,10,11], warm: [10,11,12] }, harvestMonths: { cool: [6,7,8], warm: [5,6,7] } },
  { name: "Apple Trees", emoji: "🍎", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain"], season: "Late summer to fall; perennial", difficulty: "Intermediate", yield: "50-300 lbs per mature tree", costLow: 30, costHigh: 100, why: "Long-term investment that pays off for decades. Need 2 varieties for cross-pollination.",
    plantMonths: { cool: [3,4,10,11], warm: [11,12,1] }, harvestMonths: { cool: [8,9,10], warm: [7,8,9] } },
  { name: "Herbs (basil, oregano, thyme, mint, rosemary)", emoji: "🌿", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid","Arid/Desert","Alpine/Mountain"], season: "Year-round in warm climates, spring/summer elsewhere", difficulty: "Beginner", yield: "Substantial — small space", costLow: 15, costHigh: 50, why: "Tiny footprint, huge culinary value. Most are perennial in mild climates.",
    plantMonths: { cool: [4,5,6], warm: [2,3,4,9,10] }, harvestMonths: { cool: [6,7,8,9,10], warm: [3,4,5,6,7,8,9,10,11] } },
  { name: "Asparagus", emoji: "🌱", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain"], season: "Spring; perennial", difficulty: "Intermediate", yield: "1/2 lb per plant", costLow: 30, costHigh: 80, why: "20+ year perennial. Takes 2-3 years to establish but then produces every spring with little effort.",
    plantMonths: { cool: [3,4], warm: [11,12,1] }, harvestMonths: { cool: [4,5,6], warm: [3,4,5] } },
  { name: "Broccoli & Cauliflower", emoji: "🥦", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring & fall (cool seasons)", difficulty: "Intermediate", yield: "1-2 lbs per plant", costLow: 4, costHigh: 12, why: "Cool-season heavy feeders that produce massive single heads plus side shoots after main harvest.",
    plantMonths: { cool: [3,4,8,9], warm: [10,11,1,2] }, harvestMonths: { cool: [5,6,10,11], warm: [12,1,2,3,4] } },
  { name: "Cabbage", emoji: "🥬", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring & fall", difficulty: "Beginner", yield: "2-5 lbs per head", costLow: 3, costHigh: 10, why: "Stores for months in a root cellar, ferments into kraut and kimchi, feeds families through winter.",
    plantMonths: { cool: [3,4,8], warm: [10,11,1,2] }, harvestMonths: { cool: [6,7,10,11], warm: [12,1,2,3,4] } },
  { name: "Brussels Sprouts", emoji: "🌱", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain"], season: "Long fall season", difficulty: "Intermediate", yield: "1-2 lbs per plant", costLow: 4, costHigh: 10, why: "Frost-improved flavor — sprouts taste sweetest after a hard freeze. One plant produces 50-100 sprouts.",
    plantMonths: { cool: [4,5], warm: [8,9] }, harvestMonths: { cool: [10,11,12], warm: [12,1,2,3] } },
  { name: "Beets", emoji: "🟣", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring & fall", difficulty: "Beginner", yield: "1 lb per sq ft", costLow: 3, costHigh: 8, why: "Two crops in one — leafy greens and storage roots. Stores for 3-4 months in cold cellar.",
    plantMonths: { cool: [3,4,7,8], warm: [9,10,2,3] }, harvestMonths: { cool: [6,7,9,10], warm: [11,12,1,4,5] } },
  { name: "Radishes", emoji: "🌶️", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid","Alpine/Mountain"], season: "Spring & fall (and any cool moment)", difficulty: "Beginner", yield: "1 root per seed in 30 days", costLow: 2, costHigh: 6, why: "Fastest crop in the garden — ready in just 25-30 days. Excellent companion that breaks up compacted soil.",
    plantMonths: { cool: [3,4,5,8,9], warm: [10,11,12,1,2,3] }, harvestMonths: { cool: [4,5,6,9,10], warm: [11,12,1,2,3,4] } },
  { name: "Spinach & Chard", emoji: "🥬", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring & fall (cool seasons)", difficulty: "Beginner", yield: "1-2 lbs per sq ft", costLow: 3, costHigh: 8, why: "Cold-hardy greens for fresh eating, freezing, or smoothies. Chard is heat-tolerant and produces all summer.",
    plantMonths: { cool: [3,4,8,9], warm: [10,11,1,2] }, harvestMonths: { cool: [5,6,10,11], warm: [12,1,2,3,4,5] } },
  { name: "Corn (sweet)", emoji: "🌽", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"], season: "Summer", difficulty: "Intermediate", yield: "1-2 ears per stalk", costLow: 4, costHigh: 10, why: "Heavy feeder but classic homestead crop. Best fresh from the stalk; preserve via freezing or drying.",
    plantMonths: { cool: [5,6], warm: [3,4] }, harvestMonths: { cool: [8,9], warm: [6,7,8] } },
  { name: "Peas (snap, snow, shelling)", emoji: "🫛", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring & fall (cool seasons)", difficulty: "Beginner", yield: "1/2 lb per plant", costLow: 3, costHigh: 8, why: "First fresh garden crop of spring. Like beans, fixes nitrogen in soil. Great for kids to grow.",
    plantMonths: { cool: [3,4,8], warm: [10,11,1,2] }, harvestMonths: { cool: [5,6,10], warm: [12,1,2,3,4] } },
  { name: "Eggplant", emoji: "🍆", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Semi-arid"], season: "Long warm summer", difficulty: "Intermediate", yield: "5-12 fruits per plant", costLow: 4, costHigh: 12, why: "Heat-loving and productive. Asian and Italian varieties offer dramatically different flavors and shapes.",
    plantMonths: { cool: [5,6], warm: [3,4] }, harvestMonths: { cool: [7,8,9], warm: [6,7,8,9,10] } },
  { name: "Okra", emoji: "🌶️", climates: ["Tropical","Subtropical","Mediterranean","Semi-arid","Arid/Desert"], season: "Hot summer", difficulty: "Beginner", yield: "1-2 lbs per plant", costLow: 3, costHigh: 8, why: "Thrives in heat that kills other crops. Beautiful flowers and a productive crop for southern homesteads.",
    plantMonths: { cool: [5,6], warm: [3,4,5] }, harvestMonths: { cool: [7,8,9], warm: [6,7,8,9,10] } },
  { name: "Watermelon", emoji: "🍉", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Semi-arid"], season: "Long warm season", difficulty: "Intermediate", yield: "2-4 melons per vine", costLow: 4, costHigh: 12, why: "Summer treat that thrives in heat with deep watering. Heritage varieties (Sugar Baby, Moon & Stars) outperform store-bought.",
    plantMonths: { cool: [5,6], warm: [3,4] }, harvestMonths: { cool: [8,9], warm: [6,7,8,9] } },
  { name: "Cantaloupe & Melons", emoji: "🍈", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Semi-arid","Arid/Desert"], season: "Long warm season", difficulty: "Intermediate", yield: "3-5 melons per vine", costLow: 4, costHigh: 10, why: "Vine-ripened melons are nothing like store-bought — incredible sweetness and aroma.",
    plantMonths: { cool: [5,6], warm: [3,4] }, harvestMonths: { cool: [8,9], warm: [6,7,8,9] } },
  { name: "Leeks", emoji: "🧅", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Long season; overwinters", difficulty: "Intermediate", yield: "1 leek per plant", costLow: 4, costHigh: 10, why: "Mild winter onion that survives below-freezing temps. Harvest fresh from the garden November through March.",
    plantMonths: { cool: [3,4], warm: [9,10] }, harvestMonths: { cool: [10,11,12,1,2,3], warm: [1,2,3,4,5] } },
  { name: "Turnips & Rutabagas", emoji: "🌾", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain"], season: "Spring & fall", difficulty: "Beginner", yield: "1-2 lbs per sq ft", costLow: 3, costHigh: 8, why: "Forgotten storage crops that fed entire civilizations through winter. Both roots and greens are edible.",
    plantMonths: { cool: [3,4,7,8], warm: [9,10,2] }, harvestMonths: { cool: [6,7,10,11], warm: [11,12,1,4,5] } },
  { name: "Raspberries & Blackberries", emoji: "🍇", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain"], season: "Summer; perennial canes", difficulty: "Beginner", yield: "1-3 lbs per cane", costLow: 30, costHigh: 100, why: "Spread aggressively via runners — one bed becomes a productive thicket within 2-3 years. Freeze surplus for winter.",
    plantMonths: { cool: [3,4,10,11], warm: [11,12,1,2] }, harvestMonths: { cool: [6,7,8,9], warm: [5,6,7,8] } },
  { name: "Pear Trees", emoji: "🍐", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain"], season: "Late summer to fall; perennial", difficulty: "Intermediate", yield: "50-200 lbs per mature tree", costLow: 30, costHigh: 100, why: "More disease-resistant than apples and stores beautifully. Asian pears (nashi) are crisp and sweet right off the tree.",
    plantMonths: { cool: [3,4,10,11], warm: [11,12,1] }, harvestMonths: { cool: [8,9,10], warm: [7,8,9] } },
  { name: "Peach & Nectarine Trees", emoji: "🍑", climates: ["Mediterranean","Temperate","Subtropical","Continental"], season: "Summer; perennial", difficulty: "Intermediate", yield: "30-150 lbs per mature tree", costLow: 30, costHigh: 100, why: "Self-fertile and fast-producing — fruit in just 2-3 years from a young tree. Excellent for canning and preserving.",
    plantMonths: { cool: [3,4,11], warm: [12,1,2] }, harvestMonths: { cool: [7,8], warm: [5,6,7] } },
  { name: "Fig Trees", emoji: "🌳", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Semi-arid","Arid/Desert"], season: "Late summer; perennial", difficulty: "Beginner", yield: "20-100+ lbs per mature tree", costLow: 25, costHigh: 80, why: "Drought-tolerant, self-fertile, and produce 2 crops per year in mild climates. Easy to propagate from cuttings.",
    plantMonths: { cool: [3,4,10], warm: [10,11,12,1,2] }, harvestMonths: { cool: [7,8,9], warm: [5,6,7,8,9] } },
  { name: "Citrus (lemon, lime, orange)", emoji: "🍋", climates: ["Tropical","Subtropical","Mediterranean","Arid/Desert"], season: "Year-round in warm zones; perennial", difficulty: "Intermediate", yield: "50-300 lbs per mature tree", costLow: 40, costHigh: 150, why: "Evergreen, self-fertile, and produce fruit nearly year-round in warm climates. Dwarf varieties grow in containers indoors.",
    plantMonths: { warm: [3,4,5,9,10,11], cool: [4,5] }, harvestMonths: { warm: [11,12,1,2,3,4], cool: [10,11,12,1] } },
  { name: "Grapes", emoji: "🍇", climates: ["Mediterranean","Temperate","Continental","Subtropical","Semi-arid"], season: "Late summer to fall; perennial", difficulty: "Intermediate", yield: "10-30 lbs per mature vine", costLow: 20, costHigh: 60, why: "Productive, long-lived perennials that grow on trellises with minimal footprint. For wine, table grapes, or jelly.",
    plantMonths: { cool: [3,4,10,11], warm: [11,12,1,2] }, harvestMonths: { cool: [8,9,10], warm: [7,8,9] } },
  { name: "Hazelnuts", emoji: "🌰", climates: ["Mediterranean","Temperate","Continental","Alpine/Mountain"], season: "Fall; perennial", difficulty: "Intermediate", yield: "5-10 lbs per mature bush", costLow: 30, costHigh: 80, why: "Multi-trunked nut bushes that produce annually within 4-5 years. Excellent for hedgerows and food forests.",
    plantMonths: { cool: [3,4,10,11], warm: [11,12,1] }, harvestMonths: { cool: [9,10], warm: [8,9] } },
  { name: "Comfrey", emoji: "🌿", climates: ["Mediterranean","Temperate","Continental","Subtropical","Alpine/Mountain"], season: "Spring through fall; perennial", difficulty: "Beginner", yield: "5-10 lbs of mulch material per plant per cut, multiple cuts/year", costLow: 15, costHigh: 40, why: "The ultimate permaculture plant — mines deep minerals, makes living mulch, feeds chickens & rabbits, and heals wounds.",
    plantMonths: { cool: [4,5,9,10], warm: [10,11,2,3] }, harvestMonths: { cool: [5,6,7,8,9], warm: [3,4,5,6,7,8,9,10] } },
  { name: "Sunflowers", emoji: "🌻", climates: ["Tropical","Subtropical","Mediterranean","Temperate","Continental","Semi-arid"], season: "Summer", difficulty: "Beginner", yield: "1-2 cups seeds per head", costLow: 3, costHigh: 8, why: "Multi-purpose — bird & chicken feed, edible seeds, pollinator magnet, soil-decompactor, and natural trellis for beans.",
    plantMonths: { cool: [5,6], warm: [3,4,5] }, harvestMonths: { cool: [8,9], warm: [7,8,9] } },
];

// Regenerative practices keyed by vegetable name
const VEGETABLE_REGENERATIVE = {
  "Tomatoes": [
    "Save seeds from your best fruits each year — after 5-7 generations you'll have a strain uniquely adapted to your land.",
    "Underplant with crimson clover or hairy vetch as a living mulch — fixes nitrogen and shades roots.",
    "Mulch heavily with composted leaves or straw — feeds soil biology and eliminates the need for synthetic fertilizer.",
  ],
  "Zucchini & Summer Squash": [
    "Let one fruit fully mature each year and save the seeds — adapts the variety to your microclimate.",
    "Interplant with nasturtiums and dill — attracts predator insects, reducing pest management needs to zero.",
    "Plant in 'hugelkultur' mounds (buried logs + compost) — holds water for weeks and eliminates summer irrigation.",
  ],
  "Lettuce & Salad Greens": [
    "Practice succession planting every 2-3 weeks — a smaller continuous harvest beats one big bolting harvest.",
    "Let a few plants bolt and self-seed — you'll get free volunteer lettuce for years with no work.",
    "Use the cut-and-come-again method — never pull whole plants, just outer leaves. Plants regrow 4-6 times.",
  ],
  "Beans (bush & pole)": [
    "Beans fix atmospheric nitrogen into your soil — plant them before heavy feeders like corn or tomatoes the next year.",
    "Leave bean roots in the ground after harvest — chop tops for compost, let roots feed soil biology and release nitrogen.",
    "Save dried beans as seed for next year — open-pollinated varieties stay true and improve over generations.",
  ],
  "Garlic": [
    "Save your largest cloves to replant each fall — bulbs get progressively larger and better adapted year after year.",
    "Plant garlic between brassicas and fruit trees as a permanent pest deterrent — repels aphids and rabbits.",
    "Use garlic scapes (the curly flower stalks) as a free spring crop — pesto, stir-fries, fermented hot sauce.",
  ],
  "Potatoes": [
    "Save your own seed potatoes from the best plants — a few keepers each year creates an adapted strain over time.",
    "Grow in deep mulch (no-till method) — pile straw or leaves on top of seed potatoes; harvest by pulling back mulch, no digging.",
    "Plant potatoes in a 'chop and drop' bed where you've sheet-mulched the year before — builds soil and yields simultaneously.",
  ],
  "Kale & Collards": [
    "Let plants overwinter and go to flower in spring — the blooms feed early pollinators when little else is blooming.",
    "Save seed from second-year plants — collards and kale are biennials and produce thousands of seeds per plant.",
    "Underplant with white clover as a permanent living mulch — suppresses weeds and fixes nitrogen for the kale.",
  ],
  "Cucumbers": [
    "Let a few cucumbers fully ripen to yellow and save seeds — heirloom varieties adapt quickly to local conditions.",
    "Grow vertically on cattle-panel trellises that last 20+ years — maximizes airflow, reducing disease without sprays.",
    "Interplant with radishes and dill — confuses cucumber beetles and attracts beneficial wasps.",
  ],
  "Peppers (sweet & hot)": [
    "Overwinter pepper plants indoors in pots — a 3-4 year-old plant produces 5x the yield of a first-year plant.",
    "Save seeds from peppers that ripen first — selects for shorter season adaptation.",
    "Mulch with composted manure — peppers are heavy feeders, and organic mulch eliminates the need for synthetic fertilizer.",
  ],
  "Carrots": [
    "Let a few carrots overwinter and go to seed in their second year — biennial; produces thousands of seeds per plant.",
    "Plant carrots in beds previously occupied by deep-rooted cover crops (daikon radish) — leaves perfect soft channels.",
    "Companion plant with chives or onions to mask carrot smell from rust flies — eliminates need for row covers.",
  ],
  "Onions": [
    "Save the smallest onions as 'sets' to replant the following year — closes the seed loop, no more buying starts.",
    "Use onion tops as a chop-and-drop mulch — naturally repels pests when scattered around brassicas.",
    "Plant alliums (onions, garlic, leeks) throughout the garden as a permanent pest deterrent network.",
  ],
  "Sweet Potatoes": [
    "Save and root your own slips each spring from last year's harvest — one tuber produces 20+ slips for free.",
    "Use sweet potato vines as a living ground cover — the dense leaves smother weeds and shade the soil.",
    "Plant in raised mounds with comfrey — comfrey's deep roots mine minerals that sweet potatoes can use.",
  ],
  "Winter Squash & Pumpkins": [
    "Save seeds from your best fruits — squash readily adapts to local conditions over a few generations.",
    "Plant in last year's compost pile — squash thrives in pure compost and helps break it down into garden soil.",
    "Use the Three Sisters method (corn + beans + squash) — mutual benefit eliminates need for fertilizer or weeding.",
  ],
  "Strawberries": [
    "Let runners root naturally in adjacent beds — one plant becomes 10+ in a year for free.",
    "Refresh beds every 3 years by digging up old crowns and replanting daughter runners — keeps yields high indefinitely.",
    "Mulch with pine needles or straw — protects fruit from soil contact and feeds soil acidity strawberries love.",
  ],
  "Blueberries": [
    "Mulch annually with pine needles, oak leaves, or wood chips — maintains acidic soil naturally without sulfur amendments.",
    "Plant a guild around each bush: comfrey for mulch, clover for nitrogen, chives for pest control.",
    "Take cuttings from your best-producing bushes to propagate new plants for free — no nursery purchases needed.",
  ],
  "Apple Trees": [
    "Underplant with comfrey, daffodils, and clover — a fruit tree guild reduces pests, fixes nitrogen, and eliminates fertilizer.",
    "Save seeds from your favorite apples — plant rootstock then graft scions from heritage varieties for self-replicating orchards.",
    "Use chickens or sheep to clean up fallen fruit — interrupts the codling moth cycle without sprays.",
  ],
  "Herbs (basil, oregano, thyme, mint, rosemary)": [
    "Most perennial herbs are easily propagated from cuttings — one plant becomes 20 over a few years for free.",
    "Let herbs flower for pollinators before harvesting — bees, hoverflies, and parasitic wasps flock to herb blossoms.",
    "Plant perennial herbs as 'living borders' around vegetable beds — permanent pest deterrent with no replanting.",
  ],
  "Asparagus": [
    "Top-dress beds with composted manure each fall — a well-fed asparagus bed produces for 20-30 years.",
    "Let a few stalks fern out each year — the ferns photosynthesize and store energy for stronger spears next spring.",
    "Save seed from the strongest plants — asparagus self-seeds readily and creates new beds with no purchase.",
  ],
  "Broccoli & Cauliflower": [
    "Save seeds from the latest-bolting plants — selects for slow-bolting, heat-tolerant strains.",
    "After main harvest, let plants produce side shoots for weeks of additional smaller heads.",
    "Underplant with white clover — fixes nitrogen for these heavy feeders without needing fertilizer.",
  ],
  "Cabbage": [
    "Save seeds from the most cold-hardy plants by overwintering — biennial that produces seed in year two.",
    "Ferment surplus into kraut and kimchi — preservation method that improves nutrient bioavailability.",
    "Use spent leaves as chicken feed — closes the loop and converts garden waste to eggs.",
  ],
  "Brussels Sprouts": [
    "Plant after legumes (beans, peas) to take advantage of nitrogen they fixed in the soil.",
    "Mulch heavily with leaves and straw — feeds soil through the long growing season.",
    "Save seeds from the latest-producing plants — selects for cold-hardy strains over generations.",
  ],
  "Beets": [
    "Eat both roots AND greens — beet greens are even more nutritious than the roots.",
    "Save seeds from the strongest second-year plants — biennial that produces thousands of seeds per plant.",
    "Use beet thinnings as instant baby greens — never waste a seedling.",
  ],
  "Radishes": [
    "Let some radishes go to flower for beneficial insects, then save seed pods (they're edible too).",
    "Use as a cover crop — daikon radishes break up compacted soil with their massive taproots.",
    "Plant between slower crops as a 'placeholder' — harvest in 30 days before the slow crop needs the space.",
  ],
  "Spinach & Chard": [
    "Let chard overwinter in mild climates — it'll produce a massive second-year flush before going to seed.",
    "Save seeds from the slowest-bolting spinach plants — creates heat-tolerant strains for warm climates.",
    "Cut leaves rather than pulling whole plants — cut-and-come-again gets you 4-6 harvests per plant.",
  ],
  "Corn (sweet)": [
    "Save dry seed from the best ears for next year — corn easily adapts to local growing conditions.",
    "Use in the Three Sisters method with beans and squash — eliminates need for fertilizer and weeding.",
    "Compost stalks and cobs — corn residue is excellent carbon for the compost pile.",
  ],
  "Peas (snap, snow, shelling)": [
    "Like beans, peas fix nitrogen — plant before heavy feeders like tomatoes or corn.",
    "Save dried peas as seed for next year — open-pollinated varieties produce reliable offspring.",
    "Leave roots in soil after harvest — releases nitrogen for the next crop in that bed.",
  ],
  "Eggplant": [
    "Save seeds from the earliest-ripening fruits — selects for shorter-season varieties year over year.",
    "Plant near beans or peas — they provide the heavy feeding that eggplants demand.",
    "Mulch heavily with composted manure — eliminates need for synthetic fertilizer through the long season.",
  ],
  "Okra": [
    "Save seeds from the largest pods left to dry on the plant — okra produces hundreds of viable seeds per plant.",
    "Use okra as part of a hot-climate cover crop rotation — heat-tolerant and improves soil tilth.",
    "Harvest pods young (3-4 inches) every 1-2 days for continuous production all season.",
  ],
  "Watermelon": [
    "Save seeds from your best-tasting melons — open-pollinated heirlooms quickly adapt to your soil and climate.",
    "Plant in last year's compost pile — watermelons thrive in pure decomposed organic matter.",
    "Use vine-prunings as mulch around other heat-loving crops — chop and drop in place.",
  ],
  "Cantaloupe & Melons": [
    "Save seeds from heirloom varieties — they breed true and adapt over a few seasons.",
    "Trellis vertically with mesh slings to support fruit — saves space and reduces ground rot.",
    "Plant alongside corn and squash for a heat-loving Three Sisters variation.",
  ],
  "Leeks": [
    "Save seed from the latest-bolting plants in their second year — produces flat-headed seedheads with thousands of seeds.",
    "Replant the bottom inch of harvested leeks — they'll regrow into new plants for free.",
    "Companion plant with carrots — leeks repel carrot flies and don't compete for space.",
  ],
  "Turnips & Rutabagas": [
    "Plant turnips as a fall cover crop — they break up compacted soil and produce edible greens and roots.",
    "Feed surplus to chickens, pigs, or rabbits — turning excess garden production into protein.",
    "Save seed from biennial second-year plants — easy seed-saving for these forgotten staples.",
  ],
  "Raspberries & Blackberries": [
    "Encourage natural spreading via runners — one plant becomes a productive thicket in 2-3 years.",
    "Use prunings as chicken bedding — birds shred them and you compost the result for the garden.",
    "Plant with comfrey at the base — provides slow-release nutrients and suppresses grass.",
  ],
  "Pear Trees": [
    "Save seeds and grow rootstock, then graft scions of your favorite varieties — replicate trees forever.",
    "Underplant with daffodils, garlic, and chives — natural deer/rodent deterrent and pest barrier.",
    "Use chickens or geese to clean up dropped fruit — breaks pest cycles without sprays.",
  ],
  "Peach & Nectarine Trees": [
    "Plant a fruit tree guild: comfrey for mulch, white clover for nitrogen, garlic for pest control.",
    "Save pits and grow rootstock — graft your favorite varieties for a self-replicating orchard.",
    "Use ducks or chickens beneath trees to disrupt the peach tree borer life cycle.",
  ],
  "Fig Trees": [
    "Propagate from cuttings — figs root easily and one mother tree becomes 20 daughters in a couple years.",
    "Mulch heavily with woodchips — fig roots are shallow and benefit from cool, moist soil.",
    "Espalier or pollard to keep size manageable — extends harvest and increases yield per square foot.",
  ],
  "Citrus (lemon, lime, orange)": [
    "Use citrus peels and pulp as mulch around the trees — returns minerals directly to the source.",
    "Companion plant with comfrey, garlic, and lavender — repels pests and provides slow-release nutrients.",
    "Save seeds and grow rootstock from the most disease-resistant trees, then graft favorite varieties.",
  ],
  "Grapes": [
    "Train grapes onto fences, arbors, or trellises that produce other yields — vertical productivity.",
    "Use prunings (canes) for basket-weaving, plant supports, and trellis ties — zero waste.",
    "Plant under fruit trees as living mulch in mild climates — multi-story food production.",
  ],
  "Hazelnuts": [
    "Plant as part of a multi-purpose hedgerow — provides nuts, wildlife habitat, and windbreak in one feature.",
    "Coppice plants every 7-10 years — regrows vigorously and provides biomass for hugelkultur or charcoal.",
    "Layer or root-divide established bushes — hazelnuts naturally form thickets, easy to propagate for free.",
  ],
  "Comfrey": [
    "Use as 'chop and drop' mulch — cut leaves 4x per year and lay them around fruit trees and heavy feeders.",
    "Make comfrey tea (steep leaves in water for 2 weeks) — potassium-rich liquid fertilizer for tomatoes and peppers.",
    "Plant Bocking 14 (sterile cultivar) — won't spread by seed, only divisions you control.",
  ],
  "Sunflowers": [
    "Save seeds for next year — open-pollinated varieties produce thousands of seeds per head.",
    "Use stalks as bean trellises after harvest — natural, free, and biodegradable supports.",
    "Plant as a soil decontaminator — sunflowers absorb heavy metals and toxins from polluted soil.",
  ],
};

const COMPANION_COMBOS = [
  { combo: "Tomatoes + Basil", benefit: "Basil repels tomato hornworms and whiteflies. Some say it improves tomato flavor. Classic Italian garden pairing." },
  { combo: "Three Sisters: Corn + Beans + Squash", benefit: "Corn provides a trellis for beans, beans fix nitrogen for corn, squash leaves shade the soil and deter pests with prickly leaves. Indigenous permaculture at its finest." },
  { combo: "Carrots + Onions", benefit: "Onion smell confuses carrot flies; carrots disrupt onion fly. Both are root crops that don't compete." },
  { combo: "Cucumbers + Nasturtiums", benefit: "Nasturtiums lure aphids and cucumber beetles away as a sacrificial trap crop. Edible flowers too." },
  { combo: "Cabbage + Dill", benefit: "Dill attracts beneficial wasps that prey on cabbage worms. Dill also improves cabbage growth." },
  { combo: "Strawberries + Borage", benefit: "Borage attracts pollinators and is said to improve strawberry flavor and yield. Borage flowers are edible too." },
  { combo: "Lettuce + Radishes", benefit: "Radishes mature fast (30 days) and break up soil for slower-growing lettuce. Plant together, harvest radishes first." },
  { combo: "Beans + Corn (no squash)", benefit: "Beans climb the corn stalks and add nitrogen. Don't plant beans with onions or garlic — they stunt bean growth." },
  { combo: "Peppers + Marigolds", benefit: "Marigolds deter nematodes in the soil and aphids above ground. Plant a border around pepper beds." },
  { combo: "Roses + Garlic", benefit: "Garlic repels aphids and Japanese beetles that attack roses. Said to enhance rose fragrance." },
];

const PEST_MANAGEMENT = [
  { plant: "All vegetables", companion: "Marigolds (French)", pest: "Nematodes & aphids", how: "Plant a border of French marigolds around any vegetable bed. Their roots release alpha-terthienyl which kills root-knot nematodes." },
  { plant: "Brassicas (cabbage, kale, broccoli)", companion: "Nasturtiums or thyme", pest: "Cabbage white butterflies & aphids", how: "Nasturtiums act as a trap crop drawing pests away. Thyme's strong scent confuses cabbage moths searching for host plants." },
  { plant: "Tomatoes & peppers", companion: "Basil", pest: "Hornworms, whiteflies, mosquitoes", how: "Basil's volatile oils repel the moths that lay hornworm eggs. Plant 2-3 basil plants between tomatoes." },
  { plant: "Carrots", companion: "Chives or onions", pest: "Carrot rust fly", how: "Allium scent masks the carrot scent that rust flies use to locate plants. Interplant in alternating rows." },
  { plant: "Squash & cucumbers", companion: "Radishes & nasturtiums", pest: "Squash bugs & cucumber beetles", how: "Radishes left to flower attract predatory insects. Nasturtiums lure beetles away from your squash." },
  { plant: "Roses & berries", companion: "Garlic & chives", pest: "Aphids, Japanese beetles", how: "Sulfur compounds in alliums repel soft-bodied insects. Plant a ring of garlic around prized plants." },
];

const BEGINNER_TIPS = [
  "Start small. A 4×8 raised bed and 3 chickens will teach you more in one season than reading 10 books.",
  "Build your soil first. Top-dress with 2-3 inches of compost before planting anything. Healthy soil = forgiving garden.",
  "Buy starts (transplants), not seeds, for your first year. Seeds add a layer of difficulty you don't need yet.",
  "Mulch heavily — straw, wood chips, or leaves. It retains moisture, suppresses weeds, and feeds soil. Aim for 3-4 inches.",
  "Water deeply 2-3 times per week, not lightly every day. Deep watering trains roots to grow down.",
  "Find a local mentor, master gardener program, or extension office. Region-specific knowledge is gold.",
  "Keep a garden journal. Note what you planted, when, and what worked. Year 2 will be transformative.",
];

const EXPERT_TIPS = [
  "Implement crop rotation on a 4-year cycle: legumes → leafy → fruiting → root. Prevents disease buildup and balances soil nutrients.",
  "Build a hugelkultur bed for drought-tolerant perennials — buried logs become long-term fertility & moisture reservoirs.",
  "Run electric netting for rotational grazing if you have livestock. Mob-graze paddocks for 1-3 days then rest 30+ days.",
  "Save seeds from your strongest performers. After 5-7 generations, you'll have varieties uniquely adapted to your microclimate.",
  "Integrate animals into garden cleanup. Chickens after tomatoes, pigs to till annual beds, ducks for slug patrol in spring.",
  "Set up a season extension system — low tunnels, cold frames, or a hoop house. Easily adds 2-3 months to your growing season.",
  "Track inputs vs. outputs by weight. Most homesteaders are shocked by their actual cost-per-pound when they finally measure.",
];

// Whole-system regenerative practices that span the entire homestead
const WHOLE_SYSTEM_REGEN = [
  {
    title: "Close the Nutrient Loop",
    icon: "♻️",
    detail: "Every output becomes another input. Kitchen scraps → chickens → eggs + manure → compost → garden → kitchen. Goal: zero waste leaves the property and zero fertility gets purchased.",
  },
  {
    title: "Build Soil, Not Just Crops",
    icon: "🌱",
    detail: "Healthy soil is a living ecosystem. Cover crop bare beds, never till deeper than 2 inches, mulch year-round, and add compost twice yearly. Topsoil should grow ¼ inch per year.",
  },
  {
    title: "Capture & Slow Water",
    icon: "💧",
    detail: "Rain barrels, swales, ponds, and mulched beds turn rainfall into a stored asset. A 1,000 sq ft roof captures 600 gallons per inch of rain. Stop runoff, start storage.",
  },
  {
    title: "Stack Functions",
    icon: "🌿",
    detail: "Every element should serve 3+ purposes. A hedgerow is a windbreak + wildlife habitat + chicken forage + berry harvest. Design for layered use, not single-purpose features.",
  },
  {
    title: "Plant Perennials First",
    icon: "🌳",
    detail: "Trees, berry bushes, asparagus, rhubarb, herbs — perennials produce for decades with minimal input. Aim for 50%+ of your food to come from perennials over time.",
  },
  {
    title: "Welcome Wildlife",
    icon: "🦋",
    detail: "Native plant strips, brush piles, water sources, and unmowed corners invite predator insects, pollinators, and birds that eat pests. A diverse ecosystem self-regulates without sprays.",
  },
  {
    title: "Save Seeds & Genetics",
    icon: "🌾",
    detail: "Open-pollinated seeds, breeding your own poultry, and propagating from cuttings reduce dependency on outside inputs and create genetics adapted to your specific land.",
  },
  {
    title: "Sequester Carbon",
    icon: "🌍",
    detail: "Cover crops, perennial pasture, biochar, and silvopasture pull CO₂ from the atmosphere and lock it in soil. A well-managed acre can sequester 1-3 tons of carbon per year.",
  },
];

// ============= HELPERS =============

function toSqFt(size, unit) {
  const n = parseFloat(size);
  if (isNaN(n)) return 0;
  switch (unit) {
    case "acres": return n * 43560;
    case "sq ft": return n;
    case "sq meters": return n * 10.764;
    case "hectares": return n * 107639;
    default: return n;
  }
}

function generatePlan(form) {
  const sqFt = toSqFt(form.landSize, form.landUnit);
  const wantsAnimals = form.priorities.includes("Livestock & poultry");
  const wantsVeggies = form.priorities.includes("Vegetables & fruit") || form.priorities.includes("Herbs & medicinals") || form.priorities.includes("Orchard / food forest");
  const wantsPollinators = form.priorities.includes("Pollinator garden");
  const wantsPasture = form.priorities.includes("Pasture / grazing");

  // Animals: filter by climate, space, and priorities, but existing animals are always included
  const existingAnimalsObj = form.existingAnimals || {};
  const hasExistingAnimals = Object.values(existingAnimalsObj).some(c => c > 0);

  let animals = [];
  // Trigger animal section if user wants animals OR pasture OR has existing animals
  if (wantsAnimals || wantsPasture || hasExistingAnimals) {
    // Step 1: Build the candidate set
    // - Always include any animal the user already has, regardless of fit
    // - Include filter-passing recommendations on top of that
    const recommended = ANIMALS
      .filter(a => a.climates.includes(form.climate) || form.climate === "Not sure")
      .filter(a => a.minSpaceSqFt <= sqFt * 0.8)
      .filter(a => a.goals.some(g => form.goals.includes(g)));

    // Apply experience filter to recommendations only
    let filteredRecommended = recommended;
    if (form.experience === "Complete beginner") {
      filteredRecommended = filteredRecommended.filter(a => a.difficulty === "Beginner");
    } else if (form.experience === "Some experience") {
      filteredRecommended = filteredRecommended.filter(a => a.difficulty !== "Advanced");
    }

    // Build the merged list: existing animals first, then recommended
    const mergedNames = new Set();
    const merged = [];

    // Add existing animals first (always included, even if not normally filtered in)
    for (const a of ANIMALS) {
      if (existingAnimalsObj[a.name] > 0) {
        const climateOK = a.climates.includes(form.climate) || form.climate === "Not sure";
        const spaceOK = a.minSpaceSqFt <= sqFt * 0.8;
        const goalsOK = a.goals.some(g => form.goals.includes(g));
        const notIdealReasons = [];
        if (!climateOK) notIdealReasons.push("not typical for your climate");
        if (!spaceOK) notIdealReasons.push("usually needs more land");
        if (!goalsOK) notIdealReasons.push("doesn't match your stated goals");

        merged.push({
          ...a,
          existing: true,
          existingCount: existingAnimalsObj[a.name],
          notIdeal: notIdealReasons.length > 0 ? notIdealReasons : null,
        });
        mergedNames.add(a.name);
      }
    }

    // Add recommended animals that aren't already in the existing list
    for (const a of filteredRecommended) {
      if (!mergedNames.has(a.name)) {
        merged.push({ ...a, existing: false, existingCount: 0 });
        mergedNames.add(a.name);
      }
    }

    // Sort: existing animals first, then by experience preference
    const diffWeight = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    merged.sort((a, b) => {
      if (a.existing !== b.existing) return a.existing ? -1 : 1;
      if (form.experience === "Expert") return diffWeight[b.difficulty] - diffWeight[a.difficulty];
      if (form.experience === "Intermediate") {
        const order = { Intermediate: 1, Beginner: 2, Advanced: 3 };
        return order[a.difficulty] - order[b.difficulty];
      }
      return diffWeight[a.difficulty] - diffWeight[b.difficulty];
    });

    // Cap at 8 (allow more if user has existing) — never drop existing animals
    const existingCount = merged.filter(a => a.existing).length;
    const maxTotal = Math.max(6, existingCount + 5);
    animals = merged.slice(0, maxTotal);

    // Step 2: Compute land budget and suggested counts
    const animalLandFraction = wantsPasture ? 0.8 : (wantsAnimals || hasExistingAnimals) ? 0.5 : 0.3;
    const animalLandBudget = Math.max(sqFt * animalLandFraction, 50);

    // Land already used by existing animals
    const existingLandUsed = animals.reduce((sum, a) =>
      sum + (a.existing ? a.existingCount * a.spacePerUnit : 0), 0);
    const remainingForNewAnimals = Math.max(0, animalLandBudget - existingLandUsed);

    // For existing animals: suggested count = max(existingCount, can-grow-to-suggestedMax)
    // For new animals: standard distribution up to suggestedMax
    const minTotalForNew = animals
      .filter(a => !a.existing)
      .reduce((sum, a) => sum + (a.spacePerUnit * a.suggestedMin), 0);

    if (minTotalForNew <= remainingForNewAnimals) {
      // All new animals get their suggestedMin
      animals = animals.map(a => ({
        ...a,
        suggestedCount: a.existing ? a.existingCount : a.suggestedMin,
      }));
      let remaining = remainingForNewAnimals - minTotalForNew;

      // Round-robin: scale up each animal toward suggestedMax
      // Existing animals can also grow if there's room
      let canStillGrow = true;
      while (remaining > 0 && canStillGrow) {
        canStillGrow = false;
        for (const a of animals) {
          if (a.suggestedCount < a.suggestedMax && remaining >= a.spacePerUnit) {
            a.suggestedCount += 1;
            remaining -= a.spacePerUnit;
            canStillGrow = true;
          }
        }
      }
    } else {
      // Not enough land for everyone's minimums — keep all existing, fit only smallest new ones
      const newAnimals = animals.filter(a => !a.existing).sort((a, b) => a.spacePerUnit - b.spacePerUnit);
      let remaining = remainingForNewAnimals;
      const fitNew = new Set();
      for (const a of newAnimals) {
        const minSpace = a.spacePerUnit * a.suggestedMin;
        if (minSpace <= remaining) {
          fitNew.add(a.name);
          remaining -= minSpace;
        }
      }
      animals = animals
        .filter(a => a.existing || fitNew.has(a.name))
        .map(a => ({
          ...a,
          suggestedCount: a.existing ? a.existingCount : a.suggestedMin,
        }));
    }

    // Step 3: Compute roomToGrow per animal — how much more they could add
    animals = animals.map(a => ({
      ...a,
      roomToGrow: Math.max(0, a.suggestedCount - (a.existingCount || 0)),
    }));
  }

  // Vegetables
  let vegetables = [];
  if (wantsVeggies || sqFt >= 100) {
    vegetables = VEGETABLES.filter(v => v.climates.includes(form.climate) || form.climate === "Not sure");

    if (form.experience === "Complete beginner") {
      vegetables = vegetables.filter(v => v.difficulty === "Beginner");
    }

    // Sort by experience preference
    const diffWeight = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    if (form.experience === "Expert") {
      vegetables.sort((a, b) => diffWeight[b.difficulty] - diffWeight[a.difficulty]);
    } else if (form.experience === "Intermediate") {
      const order = { Intermediate: 1, Beginner: 2, Advanced: 3 };
      vegetables.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    } else {
      vegetables.sort((a, b) => diffWeight[a.difficulty] - diffWeight[b.difficulty]);
    }

    vegetables = vegetables.slice(0, 10);
  }

  // Land breakdown
  const landBreakdown = [];
  if (sqFt < 500) {
    landBreakdown.push({ zone: "Intensive raised beds", area: `${Math.round(sqFt * 0.5)} sq ft`, purpose: "Salad greens, herbs, tomatoes — square-foot gardening style for max yield in tight space" });
    if (animals.length > 0) landBreakdown.push({ zone: "Small animal area", area: `${Math.round(sqFt * 0.3)} sq ft`, purpose: "Coop or hutch for quail, rabbits, or 2-3 hens" });
    landBreakdown.push({ zone: "Paths & utility", area: `${Math.round(sqFt * 0.2)} sq ft`, purpose: "Compost bin, tool storage, walkways" });
  } else if (sqFt < 5000) {
    landBreakdown.push({ zone: "Vegetable garden", area: `${Math.round(sqFt * 0.25)} sq ft`, purpose: "Mixed vegetable beds with companion planting" });
    landBreakdown.push({ zone: "Herb & pollinator garden", area: `${Math.round(sqFt * 0.1)} sq ft`, purpose: "Culinary herbs, medicinals, flowers for bees" });
    if (animals.length > 0) landBreakdown.push({ zone: "Animal area", area: `${Math.round(sqFt * 0.2)} sq ft`, purpose: "Coop, run, and small forage area" });
    landBreakdown.push({ zone: "Fruit trees & berries", area: `${Math.round(sqFt * 0.2)} sq ft`, purpose: "Dwarf fruit trees, berry bushes, asparagus" });
    landBreakdown.push({ zone: "Compost & utility", area: `${Math.round(sqFt * 0.1)} sq ft`, purpose: "Compost system, shed, paths" });
    landBreakdown.push({ zone: "Lawn / future expansion", area: `${Math.round(sqFt * 0.15)} sq ft`, purpose: "Open space, play, or future projects" });
  } else {
    const acres = (sqFt / 43560).toFixed(2);
    landBreakdown.push({ zone: "Kitchen garden", area: "0.1-0.25 acre", purpose: "Annual vegetables and herbs near the house" });
    landBreakdown.push({ zone: "Orchard / food forest", area: "0.25-0.5 acre", purpose: "Fruit trees, nut trees, berry guilds" });
    if (animals.length > 0) landBreakdown.push({ zone: "Animal infrastructure", area: "0.25-1 acre", purpose: "Coops, barns, paddocks" });
    if (wantsPasture) landBreakdown.push({ zone: "Rotational pasture", area: `${Math.max(0.5, parseFloat(acres) * 0.4).toFixed(1)} acres`, purpose: "Divided into 4-6 paddocks for grazing rotation" });
    landBreakdown.push({ zone: "Wild zone / windbreak", area: "10-15% of land", purpose: "Native plantings, wildlife habitat, hedgerows" });
    landBreakdown.push({ zone: "Infrastructure", area: "5-10% of land", purpose: "Driveways, shed, water systems, compost area" });
  }

  // Costs
  const animalSetupLow = animals.reduce((sum, a) => sum + a.setupLow, 0);
  const animalSetupHigh = animals.reduce((sum, a) => sum + a.setupHigh, 0);
  const animalAnnualLow = animals.reduce((sum, a) => sum + a.annualLow, 0);
  const animalAnnualHigh = animals.reduce((sum, a) => sum + a.annualHigh, 0);
  const vegSetupLow = vegetables.reduce((sum, v) => sum + v.costLow, 0);
  const vegSetupHigh = vegetables.reduce((sum, v) => sum + v.costHigh, 0);

  // Infrastructure scales with land
  const infraLow = sqFt < 500 ? 200 : sqFt < 5000 ? 600 : sqFt < 43560 ? 1500 : 3500;
  const infraHigh = sqFt < 500 ? 600 : sqFt < 5000 ? 2000 : sqFt < 43560 ? 5000 : 12000;

  const costs = {
    setupLow: animalSetupLow + vegSetupLow + infraLow,
    setupHigh: animalSetupHigh + vegSetupHigh + infraHigh,
    annualLow: animalAnnualLow + Math.round(vegSetupLow * 0.6),
    annualHigh: animalAnnualHigh + Math.round(vegSetupHigh * 0.6),
    breakdown: [
      { category: "🐓 Animals (setup)", estimate: animals.length ? `$${animalSetupLow.toLocaleString()} - $${animalSetupHigh.toLocaleString()}` : "—" },
      { category: "🌱 Garden seeds & starts", estimate: vegetables.length ? `$${vegSetupLow} - $${vegSetupHigh}` : "—" },
      { category: "🛠 Infrastructure (beds, fencing, tools)", estimate: `$${infraLow.toLocaleString()} - $${infraHigh.toLocaleString()}` },
      { category: "📅 Annual feed & supplies", estimate: `$${(animalAnnualLow + Math.round(vegSetupLow * 0.6)).toLocaleString()} - $${(animalAnnualHigh + Math.round(vegSetupHigh * 0.6)).toLocaleString()} / yr` },
    ],
  };

  // Companion + pest — show all
  const companionPlanting = COMPANION_COMBOS.slice(0, 6);
  const pestManagement = PEST_MANAGEMENT.slice(0, 5);

  // First steps
  const firstSteps = [
    "Test your soil pH and nutrients (cheap $15-30 kit or free through county extension office). This drives everything else.",
    sqFt < 1000
      ? "Build 1-2 raised beds (4×8 ft is the sweet spot). Fill with quality soil + compost mix."
      : "Map your land — sun exposure, water sources, slope, existing trees. Plan zones before breaking ground.",
    animals.length > 0
      ? `Start with ${animals[0].name.toLowerCase()}. Set up housing 2 weeks before bringing animals home.`
      : "Plant your easiest 3-4 crops first to build momentum and confidence.",
    "Set up a compost system. Pallet bin or tumbler — kitchen scraps + yard waste become free fertility.",
    "Connect with one local resource: master gardener group, homestead Facebook group, or extension office.",
  ];

  // Summary
  let summary = `For your ${form.landSize} ${form.landUnit} in ${form.location} (${form.climate} climate), this plan focuses on ${form.priorities.slice(0,2).join(" and ").toLowerCase()}. `;
  if (form.experience === "Complete beginner" || form.experience === "Some experience") {
    summary += "We've selected beginner-friendly options that build confidence and yield results in your first season. ";
  } else {
    summary += "We've included a mix of high-performance crops and animals suited to a more experienced operator. ";
  }
  if (sqFt < 5000) {
    summary += "On your lot size, intensive techniques (square-foot gardening, vertical growing, dwarf varieties) will maximize productivity.";
  } else {
    summary += "Your acreage gives you room for a diversified operation — annuals, perennials, and animals working together as a system.";
  }

  // Climate profile for calendar (cool vs warm)
  const warmClimates = ["Tropical","Subtropical","Mediterranean","Arid/Desert","Semi-arid"];
  const climateProfile = warmClimates.includes(form.climate) ? "warm" : "cool";

  // Build seasonal calendar from selected vegetables
  const calendar = vegetables.map(v => ({
    name: v.name,
    emoji: v.emoji,
    plantMonths: v.plantMonths?.[climateProfile] || [],
    harvestMonths: v.harvestMonths?.[climateProfile] || [],
  }));

  // Attach regenerative practices to vegetables from lookup
  vegetables = vegetables.map(v => ({
    ...v,
    regenerative: VEGETABLE_REGENERATIVE[v.name] || [],
  }));

  // Compute animal land fraction (must match the value used above for stocking suggestions)
  const animalLandFraction = wantsPasture ? 0.8 : (wantsAnimals || hasExistingAnimals) ? 0.5 : 0.3;

  return {
    summary,
    landBreakdown,
    animals,
    vegetables,
    companionPlanting,
    pestManagement,
    costs,
    beginnerTips: BEGINNER_TIPS.slice(0, 5),
    expertTips: EXPERT_TIPS.slice(0, 5),
    firstSteps,
    calendar,
    climateProfile,
    wholeSystemRegen: WHOLE_SYSTEM_REGEN,
    animalLandFraction,
    totalSqFt: sqFt,
    // Full catalogs for "browse all" overrides — climate-filtered for sanity
    fullAnimalCatalog: ANIMALS.map(a => ({ ...a, regenerative: a.regenerative || [] })),
    fullVegetableCatalog: VEGETABLES.map(v => ({
      ...v,
      regenerative: VEGETABLE_REGENERATIVE[v.name] || [],
    })),
  };
}

// ============= UI =============

const GOALS = ["Self-sufficiency", "Sell fresh meat & veg", "Hobby / recreation", "Family food security", "Sustainability", "Animal therapy / pets"];
const EXPERIENCE = ["Complete beginner", "Some experience", "Intermediate", "Expert"];
const LAND_UNITS = ["acres", "sq ft", "sq meters", "hectares"];
const CLIMATES = ["Tropical", "Subtropical", "Mediterranean", "Temperate", "Continental", "Arid/Desert", "Semi-arid", "Alpine/Mountain", "Not sure"];
const PRIORITIES = ["Vegetables & fruit", "Livestock & poultry", "Herbs & medicinals", "Pollinator garden", "Orchard / food forest", "Pasture / grazing"];

// Climate inference from free-text location.
// Order matters — more specific matches checked first (e.g. "north florida" before "florida").
const CLIMATE_KEYWORDS = [
  // ALPINE / MOUNTAIN
  { climate: "Alpine/Mountain", terms: ["alps","alpine","himalaya","andes","rockies","rocky mountain","sierra nevada","cascades","colorado mountain","montana mountain","aspen","tahoe","banff","tibet","nepal","bhutan","switzerland","swiss","tyrol","patagonia","high altitude","mountain west"] },
  // ARID / DESERT
  { climate: "Arid/Desert", terms: ["sahara","mojave","sonoran","atacama","gobi","kalahari","arabian","negev","desert","las vegas","phoenix","tucson","palm springs","death valley","saudi","uae","dubai","kuwait","qatar","oman","bahrain","yemen","libya","algeria","egypt cairo","arizona desert","nevada desert"] },
  // SEMI-ARID
  { climate: "Semi-arid", terms: ["high plains","texas panhandle","west texas","new mexico","oklahoma panhandle","eastern colorado","wyoming","south dakota","north dakota","kansas","nebraska","montana plains","steppe","great basin","outback","central australia","central spain","castilla","anatolia","central asia","kazakhstan","mongolia"] },
  // MEDITERRANEAN
  { climate: "Mediterranean", terms: ["california","san francisco","los angeles","san diego","napa","sonoma","central coast","santa barbara","bay area","sacramento valley","mediterranean","italy","spain","greece","portugal","provence","french riviera","tuscany","sicily","sardinia","crete","cyprus","israel","lebanon","western turkey","cape town","western cape","perth","adelaide","central chile","santiago chile"] },
  // TROPICAL
  { climate: "Tropical", terms: ["hawaii","puerto rico","virgin islands","caribbean","bahamas","jamaica","cuba","dominican","haiti","costa rica","panama","nicaragua","honduras","belize","guatemala","amazon","rainforest","equator","equatorial","singapore","malaysia","indonesia","philippines","thailand","vietnam","cambodia","laos","sri lanka","kerala","goa","fiji","samoa","tahiti","papua","congo","nigeria","ghana","ivory coast","kenya coast","tanzania coast","madagascar","queensland north","cairns","darwin"] },
  // SUBTROPICAL
  { climate: "Subtropical", terms: ["florida","georgia","alabama","mississippi","louisiana","south carolina","gulf coast","new orleans","houston","austin","san antonio","texas hill country","east texas","tallahassee","jacksonville","miami","orlando","tampa","savannah","charleston","memphis","atlanta","japan south","kyushu","okinawa","shanghai","hong kong","taiwan","southern china","brisbane","sydney","gold coast","sao paulo","rio de janeiro","buenos aires","uruguay","northern argentina","kwazulu","durban"] },
  // CONTINENTAL
  { climate: "Continental", terms: ["midwest","minnesota","wisconsin","michigan","iowa","illinois","indiana","ohio","pennsylvania","new york state","upstate new york","new england","vermont","new hampshire","maine","massachusetts","connecticut","rhode island","chicago","cleveland","detroit","milwaukee","minneapolis","toronto","ottawa","montreal","quebec","manitoba","saskatchewan","alberta plains","russia","siberia","ukraine","poland","germany east","austria","czech","slovakia","hungary","romania","beijing","northern china","manchuria","korea","hokkaido"] },
  // TEMPERATE (catch-all for moderate; check last among specific terms)
  { climate: "Temperate", terms: ["pacific northwest","seattle","portland","oregon","washington state","puget sound","willamette","vancouver","british columbia","england","scotland","ireland","wales","uk","united kingdom","britain","france","belgium","netherlands","holland","denmark","germany west","norway","sweden coast","new zealand","tasmania","melbourne","victoria australia","chile south","appalachia","virginia","north carolina","kentucky","tennessee","west virginia","maryland","delaware","new jersey"] },
];

function inferClimate(locationText) {
  if (!locationText) return null;
  const txt = locationText.toLowerCase();
  for (const group of CLIMATE_KEYWORDS) {
    for (const term of group.terms) {
      if (txt.includes(term)) return group.climate;
    }
  }
  return null;
}

function StepDot({ num, label, active, done, onClick }) {
  return (
    <div className={`step-dot ${active ? "active" : ""} ${done ? "done" : ""}`} onClick={onClick}>
      <span className="step-num">{done ? "✓" : num}</span>
      {label}
    </div>
  );
}

function Chip({ label, selected, onClick, variant }) {
  return (
    <div className={`chip ${selected ? "selected" : ""} ${variant || ""}`} onClick={onClick}>
      {label}
    </div>
  );
}

// Month abbreviations for calendar
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// In-memory saved plans (works in any environment, including artifacts which block localStorage)
const SAVED_PLANS_KEY = "homestead_saved_plans";

function loadSavedPlans() {
  try {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage?.getItem(SAVED_PLANS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistSavedPlans(plans) {
  try {
    window.localStorage?.setItem(SAVED_PLANS_KEY, JSON.stringify(plans));
  } catch {
    // localStorage may be blocked — plans persist in memory only for this session
  }
}

// Reusable catalog browser modal — works for both animals and plants
function CatalogBrowser({ open, onClose, fullCatalog, currentItems, climateProfile, userClimate, onAdd, kind }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("climate-match"); // climate-match | all | beginner

  if (!open) return null;

  const currentNames = new Set(currentItems.map(i => i.name));

  const filtered = fullCatalog.filter(item => {
    // Search filter
    if (search.trim()) {
      const s = search.toLowerCase();
      if (!item.name.toLowerCase().includes(s) && !(item.why || "").toLowerCase().includes(s)) {
        return false;
      }
    }
    // Climate filter
    if (filter === "climate-match" && userClimate && userClimate !== "Not sure") {
      if (!item.climates.includes(userClimate)) return false;
    }
    // Beginner filter
    if (filter === "beginner" && item.difficulty !== "Beginner") return false;

    return true;
  });

  const titleText = kind === "animals" ? "Browse All Animals" : "Browse All Plants";
  const subtitle = kind === "animals"
    ? `${fullCatalog.length} animals in our database`
    : `${fullCatalog.length} plants & crops in our database`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="catalog-modal" onClick={e => e.stopPropagation()}>
        <div className="catalog-header">
          <div className="catalog-header-top">
            <div>
              <div className="catalog-title">📚 {titleText}</div>
              <div className="catalog-meta-bar">{subtitle}</div>
            </div>
            <button className="catalog-close" onClick={onClose}>×</button>
          </div>
          <input
            type="text"
            className="catalog-search"
            placeholder={`Search ${kind === "animals" ? "animals" : "plants"} by name or trait...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          <div className="catalog-filter-chips">
            <div className={`catalog-filter-chip ${filter === "climate-match" ? "active" : ""}`} onClick={() => setFilter("climate-match")}>
              ✓ Suits my climate
            </div>
            <div className={`catalog-filter-chip ${filter === "beginner" ? "active" : ""}`} onClick={() => setFilter("beginner")}>
              🌱 Beginner only
            </div>
            <div className={`catalog-filter-chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
              Show all
            </div>
          </div>
        </div>

        <div className="catalog-list">
          {filtered.length === 0 ? (
            <div className="catalog-empty">
              No {kind} matched your search.{filter !== "all" && " Try 'Show all' to widen the filter."}
            </div>
          ) : (
            filtered.map(item => {
              const isInPlan = currentNames.has(item.name);
              return (
                <div key={item.name} className={`catalog-item ${isInPlan ? "in-plan" : ""}`}>
                  <div style={{ fontSize: 28, lineHeight: 1, paddingTop: 2 }}>{item.emoji}</div>
                  <div className="catalog-item-info">
                    <div className="catalog-item-name">{item.name}</div>
                    <div className="catalog-item-meta">{item.why}</div>
                    <div className="catalog-item-tags">
                      <span className={`tag tag-${item.difficulty === "Beginner" ? "green" : item.difficulty === "Intermediate" ? "orange" : "red"}`}>
                        {item.difficulty}
                      </span>
                      {kind === "animals" && (
                        <>
                          <span className="tag tag-blue">📐 {item.spaceText}</span>
                          <span className="cost-badge">${item.setupLow}-${item.setupHigh} setup</span>
                        </>
                      )}
                      {kind === "plants" && (
                        <>
                          <span className="tag tag-blue">🌤 {item.season}</span>
                          <span className="tag tag-green">📦 {item.yield}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    className={`catalog-add-btn ${isInPlan ? "added" : ""}`}
                    onClick={() => !isInPlan && onAdd(item)}
                    disabled={isInPlan}
                  >
                    {isInPlan ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function ExistingAnimalsPicker({ form, setForm }) {
  const existing = form.existingAnimals || {};
  const hasAny = Object.values(existing).some(v => v > 0);

  const setCount = (animalName, count) => {
    setForm(f => {
      const next = { ...(f.existingAnimals || {}) };
      if (count <= 0) delete next[animalName];
      else next[animalName] = count;
      return { ...f, existingAnimals: next };
    });
  };

  const adjust = (animalName, delta) => {
    const current = existing[animalName] || 0;
    setCount(animalName, Math.max(0, current + delta));
  };

  const clearAll = () => {
    setForm(f => ({ ...f, existingAnimals: {} }));
  };

  return (
    <>
      <div className="existing-intro">
        <div className="existing-intro-icon">🚜</div>
        <div>
          <strong>Already raising animals?</strong>
          <p>Set the count for each animal you have. We'll account for the land they use and suggest where you can grow.</p>
        </div>
      </div>

      <div className="existing-list">
        {ANIMALS.map(a => {
          const count = existing[a.name] || 0;
          const isActive = count > 0;
          return (
            <div key={a.name} className={`existing-row ${isActive ? "active" : ""}`}>
              <div className="existing-row-info">
                <div className="existing-row-name">
                  {a.emoji} {a.name}
                </div>
                <div className="existing-row-meta">
                  {count > 0
                    ? `${count} ${count === 1 ? a.unitName : a.unitNamePlural}`
                    : `Tap + to add`}
                </div>
              </div>
              <div className="stocking-controls">
                <button type="button" className="stock-btn" onClick={() => adjust(a.name, -1)} disabled={count === 0}>−</button>
                <div className="stock-count" style={{ fontSize: 18, minWidth: 28 }}>{count}</div>
                <button type="button" className="stock-btn" onClick={() => adjust(a.name, +1)}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      {hasAny && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <button type="button" className="stock-reset" onClick={clearAll}>↺ Clear all</button>
        </div>
      )}

      {!hasAny && (
        <div className="existing-skip">
          ✨ No animals yet? That's perfectly fine — just hit Generate to get a clean-slate plan.
        </div>
      )}
    </>
  );
}

function StockingAdjuster({ animals, totalSqFt, animalLandFraction, onCountsChange, onBrowseAll, onRemove }) {
  // Initialize counts from suggested values
  const [counts, setCounts] = useState(() => {
    const init = {};
    animals.forEach(a => { init[a.name] = a.suggestedCount || a.suggestedMin; });
    return init;
  });
  const [expandedAnimal, setExpandedAnimal] = useState(null);

  // When animals list changes, preserve existing counts and only initialize for new animals
  useEffect(() => {
    setCounts(prev => {
      const next = { ...prev };
      animals.forEach(a => {
        if (next[a.name] === undefined) {
          // New animal — initialize with suggested count
          next[a.name] = a.suggestedCount || a.suggestedMin;
        }
      });
      // Remove counts for animals no longer in the list
      Object.keys(next).forEach(name => {
        if (!animals.some(a => a.name === name)) delete next[name];
      });
      return next;
    });
  }, [animals]);

  // Notify parent (for save/export)
  useEffect(() => {
    onCountsChange && onCountsChange(counts);
  }, [counts]);

  const animalLandBudget = Math.max(totalSqFt * animalLandFraction, 50);

  const adjust = (name, delta) => {
    setCounts(c => {
      const next = Math.max(0, (c[name] || 0) + delta);
      return { ...c, [name]: next };
    });
  };

  const resetToSuggested = () => {
    const init = {};
    animals.forEach(a => { init[a.name] = a.suggestedCount || a.suggestedMin; });
    setCounts(init);
  };

  // Live totals
  const totalSpaceUsed = animals.reduce((sum, a) => sum + (counts[a.name] || 0) * a.spacePerUnit, 0);
  // Setup cost only applies to NEW additions beyond existing animals
  const totalSetupLow = animals.reduce((sum, a) => {
    const existing = a.existingCount || 0;
    const newOnes = Math.max(0, (counts[a.name] || 0) - existing);
    return sum + newOnes * a.setupPerUnit * 0.85;
  }, 0);
  const totalSetupHigh = animals.reduce((sum, a) => {
    const existing = a.existingCount || 0;
    const newOnes = Math.max(0, (counts[a.name] || 0) - existing);
    return sum + newOnes * a.setupPerUnit * 1.15;
  }, 0);
  const totalAnnualLow = animals.reduce((sum, a) => sum + (counts[a.name] || 0) * a.annualPerUnit * 0.85, 0);
  const totalAnnualHigh = animals.reduce((sum, a) => sum + (counts[a.name] || 0) * a.annualPerUnit * 1.15, 0);
  const totalAnimals = animals.reduce((sum, a) => sum + (counts[a.name] || 0), 0);

  const usagePercent = (totalSpaceUsed / animalLandBudget) * 100;
  const isOverBudget = totalSpaceUsed > animalLandBudget;

  // Format space nicely (sq ft if small, acres if large)
  const formatSpace = (sf) => {
    if (sf >= 43560) return `${(sf / 43560).toFixed(2)} acres`;
    if (sf >= 1000) return `${Math.round(sf).toLocaleString()} sq ft`;
    return `${Math.round(sf)} sq ft`;
  };

  const hasExisting = animals.some(a => a.existing);

  return (
    <div className="card">
      <div className="section-label">
        <div className="section-label-icon">🐓</div>
        Build Your Animal Mix
      </div>
      <p style={{ fontSize: 13, color: "var(--bark)", marginBottom: 14, lineHeight: 1.6 }}>
        {hasExisting
          ? "Your existing animals are flagged below with a 'You have' badge. We've suggested how much you can grow each one and what to add. Adjust freely — the live totals show land, costs, and remaining capacity."
          : "We've suggested a starting mix based on your land. Use the +/- buttons to adjust. Live totals update below — the bar shows how much of your animal-land budget you're using."}
      </p>

      <div className="stock-summary">
        <div className="stock-summary-row">
          <span className="stock-summary-label">🐾 Total animals</span>
          <span className="stock-summary-value">{totalAnimals}</span>
        </div>
        <div className="stock-summary-row divider-row">
          <span className="stock-summary-label">📐 Land used / available</span>
          <span className="stock-summary-value">
            {formatSpace(totalSpaceUsed)} / {formatSpace(animalLandBudget)}
          </span>
        </div>
        <div className="stock-bar">
          <div className={`stock-bar-fill ${isOverBudget ? "over" : ""}`} style={{ width: `${Math.min(100, usagePercent)}%` }} />
        </div>
        <div className="stock-summary-row" style={{ paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <span className="stock-summary-label">🛠 Setup cost {hasExisting ? "(new only)" : ""}</span>
          <span className="stock-summary-value">${Math.round(totalSetupLow).toLocaleString()} – ${Math.round(totalSetupHigh).toLocaleString()}</span>
        </div>
        <div className="stock-summary-row">
          <span className="stock-summary-label">📅 Annual cost</span>
          <span className="stock-summary-value">${Math.round(totalAnnualLow).toLocaleString()} – ${Math.round(totalAnnualHigh).toLocaleString()} / yr</span>
        </div>
        {isOverBudget && (
          <div className="stock-warning">
            ⚠ You're {formatSpace(totalSpaceUsed - animalLandBudget)} over budget. Consider reducing or rotational grazing.
          </div>
        )}
      </div>

      {animals.map((a) => {
        const count = counts[a.name] || 0;
        const spaceUsed = count * a.spacePerUnit;
        const setupCost = Math.round(count * a.setupPerUnit);
        const annualCost = Math.round(count * a.annualPerUnit);
        const isExpanded = expandedAnimal === a.name;
        const unitLabel = count === 1 ? a.unitName : a.unitNamePlural;

        // Existing animal calculations
        const existingCount = a.existingCount || 0;
        const isExisting = a.existing && existingCount > 0;
        // Setup cost only applies to NEW additions, not existing animals already in operation
        const newCount = Math.max(0, count - existingCount);
        const adjustedSetupCost = Math.round(newCount * a.setupPerUnit);
        const roomToGrow = count - existingCount;

        return (
          <div key={a.name}>
            <div className={`stocking-row ${isExisting ? "has-existing" : ""}`}>
              <div className="stocking-row-info" onClick={() => setExpandedAnimal(isExpanded ? null : a.name)} style={{ cursor: "pointer" }}>
                <div className="stocking-row-name">
                  {a.emoji} {a.name}
                  {isExisting && <span className="existing-badge">You have {existingCount}</span>}
                  {a.isExtra && <span className="existing-badge" style={{ background: "var(--leaf)", color: "var(--soil)" }}>Added</span>}
                  <span style={{ fontSize: 11, color: "var(--bark)", marginLeft: 6, fontFamily: 'Lato', fontWeight: 400 }}>
                    {isExpanded ? "▾" : "▸"}
                  </span>
                </div>
                <div className="stocking-row-meta">
                  {a.spacePerUnit < 100
                    ? `${a.spacePerUnit} sq ft per ${a.unitName}`
                    : a.spacePerUnit < 43560
                      ? `${a.spacePerUnit.toLocaleString()} sq ft per ${a.unitName}`
                      : `${(a.spacePerUnit/43560).toFixed(1)} acres per ${a.unitName}`} · {a.outputPerUnit}
                </div>
                {isExisting && roomToGrow > 0 && (
                  <div className="room-to-grow">
                    🌱 Room to grow: +{roomToGrow} more (suggested)
                  </div>
                )}
                {isExisting && roomToGrow === 0 && (
                  <div className="room-to-grow maxed">
                    ✓ At suggested capacity for your land
                  </div>
                )}
                {isExisting && roomToGrow < 0 && (
                  <div className="room-to-grow maxed">
                    ⚠ Currently above suggested for your land — consider rotational systems
                  </div>
                )}
                {a.notIdeal && (
                  <div className="not-ideal-note">
                    ⓘ {a.notIdeal.join(" · ")} — but we'll work with what you have.
                  </div>
                )}
                <div className="stock-cost-line">
                  <span className="stock-mini-tag">📐 {formatSpace(spaceUsed)}</span>
                  {newCount > 0 && <span className="stock-mini-tag">🛠 ${adjustedSetupCost.toLocaleString()} new</span>}
                  <span className="stock-mini-tag">📅 ${annualCost.toLocaleString()}/yr</span>
                </div>
              </div>
              <div className="stocking-controls">
                <button className="stock-btn" onClick={() => adjust(a.name, -1)} disabled={count === 0}>−</button>
                <div className="stock-count">{count}</div>
                <button className="stock-btn" onClick={() => adjust(a.name, +1)}>+</button>
                {a.isExtra && onRemove && (
                  <button
                    onClick={() => onRemove(a.name)}
                    style={{ background: "transparent", border: "none", color: "var(--rust)", cursor: "pointer", fontSize: 20, padding: "0 4px", marginLeft: 2 }}
                    title="Remove from plan">×</button>
                )}
              </div>
            </div>
            {isExpanded && (
              <div style={{ background: "var(--cream)", border: "1px solid #e5e0d5", borderRadius: 10, padding: 14, marginTop: -4, marginBottom: 10 }}>
                <p style={{ fontSize: 13, color: "var(--bark)", lineHeight: 1.6, marginBottom: 8 }}>{a.why}</p>
                <div className="tags">
                  {a.benefits.map((b, j) => <span key={j} className="tag tag-green">{b}</span>)}
                  <span className={`tag tag-${a.difficulty === "Beginner" ? "green" : a.difficulty === "Intermediate" ? "orange" : "red"}`}>
                    {a.difficulty}
                  </span>
                </div>
                <RegenerativeSection practices={a.regenerative} />
              </div>
            )}
          </div>
        );
      })}

      {onBrowseAll && (
        <button className="browse-btn" onClick={onBrowseAll}>
          📚 Browse all 21 animals
        </button>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button className="stock-reset" onClick={resetToSuggested}>↺ Reset to suggested</button>
      </div>
    </div>
  );
}

function RegenerativeSection({ practices, label = "Make it regenerative" }) {
  const [open, setOpen] = useState(false);
  if (!practices || practices.length === 0) return null;
  return (
    <div className="regen-section">
      <button className="regen-toggle" onClick={() => setOpen(!open)} type="button">
        <span className="regen-toggle-icon">
          🌱 {label}
          <span style={{ background: "var(--sage)", color: "white", borderRadius: 10, padding: "1px 8px", fontSize: 10, marginLeft: 4 }}>
            {practices.length}
          </span>
        </span>
        <span className={`regen-arrow ${open ? "open" : ""}`}>▶</span>
      </button>
      {open && (
        <ul className="regen-list">
          {practices.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      )}
    </div>
  );
}

function PlantingCalendar({ calendar, climateProfile }) {
  if (!calendar || calendar.length === 0) return null;
  return (
    <div className="card">
      <div className="section-label">
        <div className="section-label-icon">📅</div>
        Seasonal Planting Calendar
      </div>
      <p style={{ fontSize: 13, color: "var(--bark)", marginBottom: 14, lineHeight: 1.6 }}>
        When to plant and harvest each crop in your {climateProfile === "warm" ? "warm-climate" : "cool-climate"} region.
        Northern Hemisphere months — flip seasons by 6 months if you're south of the equator.
      </p>
      <div className="calendar-wrap">
        <div className="calendar-grid">
          <div className="cal-header">Crop</div>
          {MONTHS.map(m => <div key={m} className="cal-header">{m}</div>)}
          {calendar.map((c, i) => (
            <Fragment key={i}>
              <div className="cal-row-label">
                <span style={{ fontSize: 16 }}>{c.emoji}</span>
                <span style={{ fontSize: 11, lineHeight: 1.2 }}>{c.name.split(" ")[0]}</span>
              </div>
              {Array.from({ length: 12 }, (_, mi) => {
                const month = mi + 1;
                const isPlant = c.plantMonths.includes(month);
                const isHarvest = c.harvestMonths.includes(month);
                const cls = isPlant && isHarvest ? "both" : isPlant ? "plant" : isHarvest ? "harvest" : "";
                return <div key={mi} className={`cal-cell ${cls}`} />;
              })}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="cal-legend">
        <div className="cal-legend-item">
          <div className="cal-legend-swatch" style={{ background: "var(--leaf)" }}>🌱</div>
          Plant / Sow
        </div>
        <div className="cal-legend-item">
          <div className="cal-legend-swatch" style={{ background: "var(--sun)" }}>🧺</div>
          Harvest
        </div>
        <div className="cal-legend-item">
          <div className="cal-legend-swatch" style={{ background: "linear-gradient(135deg, var(--leaf) 50%, var(--sun) 50%)" }}>⚡</div>
          Both (succession planting)
        </div>
      </div>
      <div className="cal-note">
        💡 These are typical windows — check your local last-frost and first-frost dates for precise timing. Your county extension office is the best resource.
      </div>
    </div>
  );
}

function MarketIncomeSection({ animals, animalCounts, vegetables }) {
  // Animal rows — only those with count > 0 and a market entry
  const animalRows = animals
    .map(a => {
      const count = animalCounts[a.name] || 0;
      if (!count) return null;
      const m = ANIMAL_MARKET[a.name];
      if (!m) return null;
      const units = m.annualUnits(count);
      return {
        a, count, m, units,
        incLow:  Math.round(units * m.priceMin),
        incHigh: Math.round(units * m.priceMax),
      };
    })
    .filter(Boolean);

  // Vegetable rows — every recommended veg that has a market entry
  const vegRows = vegetables
    .map(v => {
      const m = VEG_MARKET[v.name];
      if (!m) return null;
      return { v, m };
    })
    .filter(Boolean);

  if (animalRows.length === 0 && vegRows.length === 0) return null;

  const animalTotalLow  = animalRows.reduce((s, r) => s + r.incLow,  0);
  const animalTotalHigh = animalRows.reduce((s, r) => s + r.incHigh, 0);
  const vegTotalLow     = vegRows.reduce((s, r) => s + r.m.annualIncomeLow,  0);
  const vegTotalHigh    = vegRows.reduce((s, r) => s + r.m.annualIncomeHigh, 0);
  const grandLow  = animalTotalLow  + vegTotalLow;
  const grandHigh = animalTotalHigh + vegTotalHigh;

  const fmt = (n) => n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${n}`;

  return (
    <div className="card">
      <div className="section-label">
        <div className="section-label-icon">💵</div>
        Market Income Potential
      </div>

      {/* Summary hero */}
      <div className="income-hero">
        <div className="income-hero-title">Estimated Annual Revenue</div>
        <div className="income-hero-total">{fmt(grandLow)} – {fmt(grandHigh)}</div>
        <div className="income-hero-sublabel">based on current animal counts + one standard planting of each crop</div>
        <div className="income-hero-splits">
          {animalRows.length > 0 && (
            <div className="income-hero-split">
              <div className="income-hero-split-label">🐓 Animals</div>
              <div className="income-hero-split-value">{fmt(animalTotalLow)} – {fmt(animalTotalHigh)}</div>
            </div>
          )}
          {vegRows.length > 0 && (
            <div className="income-hero-split">
              <div className="income-hero-split-label">🥕 Plants</div>
              <div className="income-hero-split-value">{fmt(vegTotalLow)} – {fmt(vegTotalHigh)}</div>
            </div>
          )}
        </div>
      </div>

      {/* Animals */}
      {animalRows.length > 0 && (
        <>
          <div className="income-subsection">🐓 By Animal Breed</div>
          <div className="income-table">
            {animalRows.map(({ a, count, m, units, incLow, incHigh }) => (
              <div className="income-row" key={a.name}>
                <div className="income-row-left">
                  <div className="income-row-name">
                    <span>{a.emoji}</span> {a.name}
                  </div>
                  <div className="income-row-detail">
                    {count} {count === 1 ? a.unitName : a.unitNamePlural} · {m.product} · {m.priceMin === m.priceMax ? `$${m.priceMin}` : `$${m.priceMin}–$${m.priceMax}`}/{m.priceUnit}
                  </div>
                  <div className="income-row-detail">{units.toLocaleString()} {m.unitsLabel} projected</div>
                  {count < m.minToSell && (
                    <div className="income-row-min">⚠ Suggest {m.minToSell}+ {a.unitNamePlural || a.name} for reliable surplus to sell</div>
                  )}
                  <div className="income-row-note">{m.note}</div>
                </div>
                <div className="income-row-right">
                  <div className="income-row-value">{fmt(incLow)} – {fmt(incHigh)}</div>
                  <div className="income-row-period">{m.period}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Vegetables */}
      {vegRows.length > 0 && (
        <>
          <div className="income-subsection">🥕 By Crop</div>
          <div className="income-table">
            {vegRows.map(({ v, m }) => (
              <div className="income-row" key={v.name}>
                <div className="income-row-left">
                  <div className="income-row-name">
                    <span>{v.emoji}</span> {v.name}
                  </div>
                  <div className="income-row-detail">
                    {m.basis} · {m.priceMin === m.priceMax ? `$${m.priceMin}` : `$${m.priceMin}–$${m.priceMax}`}{m.priceUnit}
                  </div>
                  <div className="income-row-note">{m.note}</div>
                </div>
                <div className="income-row-right">
                  <div className="income-row-value">{fmt(m.annualIncomeLow)} – {fmt(m.annualIncomeHigh)}</div>
                  <div className="income-row-period">per season</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="income-legal">
        <strong>⚖️ Legal note:</strong> Raw milk sales, meat processing, and direct food sales are regulated differently in every state. Check your state's cottage food laws and USDA/FSIS rules before selling. Farmers market permits typically cost $25-150/year and are required in most states.
      </div>
    </div>
  );
}

function WeeklyProductionSummary({ animals, animalCounts }) {
  const BADGE_LABEL = { weekly: "per week", annual: "per year", batch: "per batch", service: "service" };
  const rows = animals
    .map(animal => {
      const count = animalCounts[animal.name] || 0;
      if (count === 0) return null;
      const spec = ANIMAL_PRODUCTION_LOOKUP[animal.name];
      if (!spec) return null;
      return { animal, count, spec };
    })
    .filter(Boolean);
  if (rows.length === 0) return null;
  return (
    <div className="card">
      <div className="section-label">
        <div className="section-label-icon">📊</div>
        Weekly Production Estimate
      </div>
      <p style={{ fontSize: 13, color: "var(--bark)", marginBottom: 16, lineHeight: 1.6 }}>
        Based on your current animal counts. Egg-layers and dairy show <em>weekly</em> output; meat animals show <em>per-batch</em> yield; fiber and seasonal animals show <em>annual</em> totals.
      </p>
      <div className="production-table">
        {rows.map(({ animal, count, spec }) => (
          <div className="production-row" key={animal.name}>
            <div className="production-animal">
              <span className="production-emoji">{animal.emoji}</span>
              <div>
                <div className="production-name">{animal.name}</div>
                <div className="production-count">
                  {count} {count === 1 ? (animal.unitName || "animal") : (animal.unitNamePlural || "animals")}
                </div>
              </div>
            </div>
            <div className="production-output">
              <div className="production-value">{spec.getWeekly(count)}</div>
              <div className="production-note">
                <span className={`production-badge production-badge-${spec.type}`}>
                  {BADGE_LABEL[spec.type]}
                </span>
                <span className="production-label-text">{spec.note}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomesteadPlanner() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    landSize: "", landUnit: "acres", location: "", climate: "",
    goals: [], experience: "", priorities: [], notes: "",
    existingAnimals: {}, // { "Chickens (laying hens)": 5, ... }
  });
  const [plan, setPlan] = useState(null);
  const [animalCounts, setAnimalCounts] = useState({});
  const [extraAnimals, setExtraAnimals] = useState([]); // user-added from catalog
  const [extraVegetables, setExtraVegetables] = useState([]); // user-added from catalog
  const [showAnimalCatalog, setShowAnimalCatalog] = useState(false);
  const [showVegetableCatalog, setShowVegetableCatalog] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [planName, setPlanName] = useState("");
  const [showClimateOverride, setShowClimateOverride] = useState(false);
  const [climateAutoSet, setClimateAutoSet] = useState(false);
  const [toast, setToast] = useState(null);
  const resultsRef = useRef(null);

  // Load saved plans on mount
  useEffect(() => {
    setSavedPlans(loadSavedPlans());
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const updateForm = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleArray = (key, val) => {
    setForm(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
  };

  // Auto-detect climate when location is typed
  function handleLocationChange(val) {
    setForm(f => {
      const detected = inferClimate(val);
      // Only auto-update climate if it was auto-set before (or empty) — don't overwrite user choices
      const shouldUpdateClimate = detected && (!f.climate || climateAutoSet);
      if (shouldUpdateClimate) {
        setClimateAutoSet(true);
        return { ...f, location: val, climate: detected };
      }
      return { ...f, location: val };
    });
  }

  // When user manually picks a climate, mark it as no longer auto
  function handleClimatePick(c) {
    setClimateAutoSet(false);
    updateForm("climate", c);
  }

  const canProceed1 = form.landSize && form.location && form.climate;
  const canProceed2 = form.goals.length > 0 && form.experience;
  const canGenerate = form.priorities.length > 0;

  function handleGenerate() {
    const p = generatePlan(form);
    setPlan(p);
    setExtraAnimals([]);
    setExtraVegetables([]);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  function reset() {
    setStep(1);
    setForm({ landSize: "", landUnit: "acres", location: "", climate: "", goals: [], experience: "", priorities: [], notes: "", existingAnimals: {} });
    setPlan(null);
    setAnimalCounts({});
    setExtraAnimals([]);
    setExtraVegetables([]);
    setClimateAutoSet(false);
    setShowClimateOverride(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function savePlan() {
    const name = planName.trim() || `${form.location || "My plan"} (${form.landSize} ${form.landUnit})`;
    const newPlan = {
      id: Date.now().toString(),
      name,
      savedAt: new Date().toISOString(),
      form: { ...form },
      plan,
      animalCounts: { ...animalCounts },
    };
    const updated = [newPlan, ...savedPlans];
    setSavedPlans(updated);
    persistSavedPlans(updated);
    setShowSaveDialog(false);
    setPlanName("");
    setToast(`✓ "${name}" saved`);
  }

  function loadPlan(saved) {
    setForm(saved.form);
    // If the saved plan has user-adjusted counts, fold them back into the animals
    let restoredPlan = saved.plan;
    if (saved.animalCounts && saved.plan?.animals) {
      restoredPlan = {
        ...saved.plan,
        animals: saved.plan.animals.map(a => ({
          ...a,
          suggestedCount: saved.animalCounts[a.name] ?? a.suggestedCount,
        })),
      };
    }
    setPlan(restoredPlan);
    setAnimalCounts(saved.animalCounts || {});
    setClimateAutoSet(false);
    setShowClimateOverride(false);
    setShowSaved(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    setToast(`✓ Loaded "${saved.name}"`);
  }

  function deletePlan(id) {
    const updated = savedPlans.filter(p => p.id !== id);
    setSavedPlans(updated);
    persistSavedPlans(updated);
  }

  function exportPlan() {
    const data = {
      name: form.location ? `Homestead Plan — ${form.location}` : "Homestead Plan",
      form,
      plan,
      animalCounts,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `homestead-plan-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToast("✓ Plan downloaded");
  }

  return (
    <>
      {toast && <div className="saved-toast">{toast}</div>}
      <div className="app">
        <div className="header" style={{ position: "relative" }}>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setShowSaved(true)}>
              📁 My Plans{savedPlans.length > 0 && <span className="badge">{savedPlans.length}</span>}
            </button>
          </div>
          <div className="header-badge">🌱 Homestead Planner</div>
          <h1>Plan Your <em>Perfect</em><br />Homestead</h1>
          <p>Personalized plans for any land size — from a backyard to a full farm. For beginners and experts alike.</p>
        </div>

        {!plan && (
          <div className="steps">
            {[["1","Your Land", 1],["2","Goals", 2],["3","Focus", 3],["4","Animals", 4]].map(([n, label, s]) => (
              <StepDot key={s} num={n} label={label} active={step === s} done={step > s} onClick={() => step > s && setStep(s)} />
            ))}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && !plan && (
          <div className="card">
            <div className="card-title">Tell us about your land</div>
            <div className="card-subtitle">Don't worry — we'll adapt the plan to whatever space you have.</div>

            <label>Land Size</label>
            <div className="input-row">
              <input type="number" placeholder="e.g. 0.5, 2, 500..." value={form.landSize}
                onChange={e => updateForm("landSize", e.target.value)} />
              <select value={form.landUnit} onChange={e => updateForm("landUnit", e.target.value)}>
                {LAND_UNITS.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>

            <label>Location / Region</label>
            <input type="text" placeholder="e.g. Pacific Northwest, Texas Hill Country, Rural England..."
              value={form.location} onChange={e => handleLocationChange(e.target.value)} />

            {form.climate && climateAutoSet && !showClimateOverride && (
              <div className="climate-detected">
                <div>
                  <span className="climate-detected-label">Detected climate</span>
                  <strong>🌡 {form.climate}</strong>
                </div>
                <button type="button" className="climate-change-btn" onClick={() => setShowClimateOverride(true)}>
                  Change
                </button>
              </div>
            )}

            {form.climate && !climateAutoSet && !showClimateOverride && (
              <div className="climate-detected">
                <div>
                  <span className="climate-detected-label">Climate</span>
                  <strong>🌡 {form.climate}</strong>
                </div>
                <button type="button" className="climate-change-btn" onClick={() => setShowClimateOverride(true)}>
                  Change
                </button>
              </div>
            )}

            {!form.climate && form.location && (
              <div className="climate-prompt">
                <span>🤔 Couldn't detect climate from "{form.location}". Pick one below:</span>
              </div>
            )}

            {(showClimateOverride || !form.climate) && (
              <>
                {form.climate && <label style={{ marginTop: 8 }}>Choose a different climate</label>}
                {!form.climate && <label>Climate Type</label>}
                <div className="chip-group">
                  {CLIMATES.map(c => (
                    <Chip key={c} label={c} selected={form.climate === c} onClick={() => {
                      handleClimatePick(c);
                      setShowClimateOverride(false);
                    }} />
                  ))}
                </div>
              </>
            )}

            <button className="btn btn-primary" disabled={!canProceed1} onClick={() => setStep(2)}>
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && !plan && (
          <div className="card">
            <div className="card-title">Your goals & experience</div>
            <div className="card-subtitle">This helps us tailor advice to exactly where you're at.</div>

            <label>What are your goals? (select all that apply)</label>
            <div className="chip-group">
              {GOALS.map(g => (
                <Chip key={g} label={g} selected={form.goals.includes(g)} onClick={() => toggleArray("goals", g)} variant="goal-chip" />
              ))}
            </div>

            <label>Experience Level</label>
            <div className="chip-group">
              {EXPERIENCE.map(e => (
                <Chip key={e} label={e} selected={form.experience === e} onClick={() => updateForm("experience", e)} />
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" disabled={!canProceed2} onClick={() => setStep(3)} style={{ flex: 1 }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && !plan && (
          <div className="card">
            <div className="card-title">What would you like to focus on?</div>
            <div className="card-subtitle">Select everything you're interested in — we'll build a complete plan.</div>

            <label>Focus Areas (select all that apply)</label>
            <div className="chip-group">
              {PRIORITIES.map(p => (
                <Chip key={p} label={p} selected={form.priorities.includes(p)} onClick={() => toggleArray("priorities", p)} />
              ))}
            </div>

            <label>Anything else? (optional, for your reference)</label>
            <textarea rows={3} placeholder="Soil conditions, water access, specific plants you love, allergies..."
              value={form.notes} onChange={e => updateForm("notes", e.target.value)}
              style={{ resize: "vertical", marginBottom: 18 }} />

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-primary" disabled={!canGenerate} onClick={() => setStep(4)} style={{ flex: 1 }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — Existing animals */}
        {step === 4 && !plan && (
          <div className="card">
            <div className="card-title">What animals do you already have?</div>
            <div className="card-subtitle">Optional — we'll factor them into the plan and suggest where you have room to grow. Skip if starting from scratch.</div>

            <ExistingAnimalsPicker
              form={form}
              setForm={setForm}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button className="btn btn-secondary" onClick={() => setStep(3)}>← Back</button>
              <button className="btn btn-primary" onClick={handleGenerate} style={{ flex: 1 }}>
                🌿 Generate My Plan
              </button>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {plan && (
          <div ref={resultsRef}>
            <div className="results-header">
              <h2>Your Homestead Plan 🌾</h2>
              <p>{form.landSize} {form.landUnit} · {form.location} · {form.climate} climate</p>
            </div>

            <div className="save-bar">
              <button className="save-btn" onClick={() => setShowSaveDialog(true)}>💾 Save This Plan</button>
              <button className="save-btn outline" onClick={exportPlan}>⬇ Download as JSON</button>
              <button className="save-btn outline" onClick={() => window.print()}>🖨 Print</button>
            </div>

            <div className="card">
              <div className="card-title">Plan Overview</div>
              <p style={{ lineHeight: 1.7, color: "var(--bark)" }}>{plan.summary}</p>
              {plan.landBreakdown && plan.landBreakdown.length > 0 && (
                <>
                  <div className="divider"><div className="divider-line"/><span className="divider-icon">🗺️</span><div className="divider-line"/></div>
                  <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--bark)", marginBottom: 10 }}>Suggested Land Zones</div>
                  {plan.landBreakdown.map((z, i) => (
                    <div className="land-zone" key={i}>
                      <div className="land-zone-dot" />
                      <div>
                        <strong>{z.zone}</strong>
                        {z.area && <span className="land-zone-area">({z.area})</span>}
                        <div className="land-zone-purpose">{z.purpose}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {((plan.animals && plan.animals.length > 0) || extraAnimals.length > 0) && (
              <StockingAdjuster
                animals={[...plan.animals, ...extraAnimals]}
                totalSqFt={plan.totalSqFt}
                animalLandFraction={plan.animalLandFraction}
                onCountsChange={setAnimalCounts}
                onBrowseAll={() => setShowAnimalCatalog(true)}
                onRemove={(name) => {
                  // Only allow removing extras, not core suggestions
                  setExtraAnimals(arr => arr.filter(a => a.name !== name));
                }}
              />
            )}

            {(!plan.animals || plan.animals.length === 0) && extraAnimals.length === 0 && (
              <div className="card" style={{ textAlign: "center" }}>
                <div className="section-label" style={{ justifyContent: "center" }}>
                  <div className="section-label-icon">🐓</div>
                  Animals
                </div>
                <p style={{ fontSize: 13, color: "var(--bark)", marginBottom: 14, lineHeight: 1.6 }}>
                  No animal recommendations were generated based on your priorities. Want to add some anyway?
                </p>
                <button className="browse-btn" onClick={() => setShowAnimalCatalog(true)}>
                  📚 Browse all 21 animals
                </button>
              </div>
            )}

            {((plan.animals && plan.animals.length > 0) || extraAnimals.length > 0) && (
              <WeeklyProductionSummary
                animals={[...plan.animals, ...extraAnimals]}
                animalCounts={animalCounts}
              />
            )}

            {((plan.vegetables && plan.vegetables.length > 0) || extraVegetables.length > 0) && (
              <div className="card">
                <div className="section-label">
                  <div className="section-label-icon">🥕</div>
                  Vegetables, Fruits & Plants
                </div>
                {[...plan.vegetables, ...extraVegetables].map((v, i) => {
                  const isExtra = extraVegetables.some(e => e.name === v.name);
                  return (
                    <div className="result-item" key={v.name}>
                      <div className="result-item-header">
                        <div className="result-item-title">
                          {v.emoji} {v.name}
                          {isExtra && <span className="existing-badge" style={{ background: "var(--leaf)", color: "var(--soil)" }}>Added</span>}
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span className={`tag tag-${v.difficulty === "Beginner" ? "green" : v.difficulty === "Intermediate" ? "orange" : "red"}`}>
                            {v.difficulty}
                          </span>
                          {isExtra && (
                            <button
                              onClick={() => setExtraVegetables(arr => arr.filter(a => a.name !== v.name))}
                              style={{ background: "transparent", border: "none", color: "var(--rust)", cursor: "pointer", fontSize: 18, padding: "0 4px" }}
                              title="Remove">×</button>
                          )}
                        </div>
                      </div>
                      <p>{v.why}</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                        <span className="tag tag-blue">🌤 {v.season}</span>
                        <span className="tag tag-green">📦 {v.yield}</span>
                        <span className="cost-badge">${v.costLow}-${v.costHigh}/season</span>
                      </div>
                      <RegenerativeSection practices={v.regenerative} />
                    </div>
                  );
                })}
                <button className="browse-btn" onClick={() => setShowVegetableCatalog(true)}>
                  📚 Browse all {plan.fullVegetableCatalog?.length || 41} plants & crops
                </button>
              </div>
            )}

            {(!plan.vegetables || plan.vegetables.length === 0) && extraVegetables.length === 0 && (
              <div className="card" style={{ textAlign: "center" }}>
                <div className="section-label" style={{ justifyContent: "center" }}>
                  <div className="section-label-icon">🥕</div>
                  Plants
                </div>
                <p style={{ fontSize: 13, color: "var(--bark)", marginBottom: 14, lineHeight: 1.6 }}>
                  No plant recommendations were generated. Want to add some?
                </p>
                <button className="browse-btn" onClick={() => setShowVegetableCatalog(true)}>
                  📚 Browse all {plan.fullVegetableCatalog?.length || 41} plants
                </button>
              </div>
            )}

            {form.goals.includes("Sell fresh meat & veg") && (
              <MarketIncomeSection
                animals={[...(plan.animals || []), ...extraAnimals]}
                animalCounts={animalCounts}
                vegetables={[...(plan.vegetables || []), ...extraVegetables]}
              />
            )}

            {plan.calendar && plan.calendar.length > 0 && (
              <PlantingCalendar calendar={plan.calendar} climateProfile={plan.climateProfile} />
            )}

            {plan.companionPlanting && plan.companionPlanting.length > 0 && (
              <div className="card">
                <div className="section-label">
                  <div className="section-label-icon">🌿</div>
                  Companion Planting Combos
                </div>
                <div className="companion-grid">
                  {plan.companionPlanting.map((c, i) => (
                    <div className="companion-pair" key={i}>
                      <strong>{c.combo}</strong>
                      {c.benefit}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {plan.pestManagement && plan.pestManagement.length > 0 && (
              <div className="card">
                <div className="section-label">
                  <div className="section-label-icon">🐛</div>
                  Natural Pest Management
                </div>
                {plan.pestManagement.map((p, i) => (
                  <div className="tip-box" key={i}>
                    <strong>🌱 {p.plant} + {p.companion} → repels {p.pest}</strong>
                    {p.how}
                  </div>
                ))}
              </div>
            )}

            {plan.costs && (
              <div className="cost-summary">
                <h3>💰 Estimated Costs</h3>
                <div className="cost-row cost-row-total">
                  <span>Initial Setup</span>
                  <span>${plan.costs.setupLow.toLocaleString()} – ${plan.costs.setupHigh.toLocaleString()}</span>
                </div>
                <div className="cost-row cost-row-total">
                  <span>Annual Operating</span>
                  <span>${plan.costs.annualLow.toLocaleString()} – ${plan.costs.annualHigh.toLocaleString()} / yr</span>
                </div>
                <div style={{ height: 8 }}/>
                {plan.costs.breakdown.map((b, i) => (
                  <div className="cost-row" key={i}>
                    <span style={{ opacity: 0.85 }}>{b.category}</span>
                    <span>{b.estimate}</span>
                  </div>
                ))}
              </div>
            )}

            {plan.wholeSystemRegen && plan.wholeSystemRegen.length > 0 && (
              <div className="whole-regen-card">
                <h3>🌍 Make It Regenerative</h3>
                <p className="whole-regen-intro">
                  These principles turn a homestead from "sustainable" (maintaining the status quo) into "regenerative" (actively
                  improving soil, biodiversity, and resilience year over year). Each animal and plant above also has its own
                  specific regenerative practices — tap "🌱 Make it regenerative" on any item to expand.
                </p>
                <div className="whole-regen-grid">
                  {plan.wholeSystemRegen.map((r, i) => (
                    <div className="whole-regen-item" key={i}>
                      <div className="whole-regen-item-title">
                        <span style={{ fontSize: 18 }}>{r.icon}</span>
                        {r.title}
                      </div>
                      <div className="whole-regen-item-detail">{r.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="card">
              <div className="section-label">
                <div className="section-label-icon">💡</div>
                Tips For Your Level
              </div>
              {(form.experience === "Complete beginner" || form.experience === "Some experience"
                ? plan.beginnerTips
                : plan.expertTips
              ).map((t, i) => (
                <div className="tip-box" key={i}>
                  <strong>{form.experience === "Complete beginner" || form.experience === "Some experience" ? `Tip ${i+1}` : `Pro Tip ${i+1}`}</strong>
                  {t}
                </div>
              ))}
            </div>

            {plan.firstSteps && plan.firstSteps.length > 0 && (
              <div className="card">
                <div className="section-label">
                  <div className="section-label-icon">🚀</div>
                  Your First Steps
                </div>
                {plan.firstSteps.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12, alignItems: "flex-start" }}>
                    <div style={{
                      minWidth: 28, height: 28,
                      background: "var(--moss)", color: "white",
                      borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, flexShrink: 0
                    }}>{i+1}</div>
                    <p style={{ paddingTop: 4, lineHeight: 1.6, fontSize: 14, color: "var(--bark)" }}>{s}</p>
                  </div>
                ))}
              </div>
            )}

            <button className="reset-btn" onClick={reset}>↺ Start a New Plan</button>
          </div>
        )}
      </div>

      {/* CATALOG BROWSERS */}
      <CatalogBrowser
        open={showAnimalCatalog}
        onClose={() => setShowAnimalCatalog(false)}
        fullCatalog={plan?.fullAnimalCatalog || []}
        currentItems={[...(plan?.animals || []), ...extraAnimals]}
        userClimate={form.climate}
        kind="animals"
        onAdd={(item) => {
          // Compute a sensible suggested count based on remaining animal land budget
          const animalLandBudget = (plan?.totalSqFt || 0) * (plan?.animalLandFraction || 0.5);
          const startCount = Math.min(item.suggestedMin, item.suggestedMax);
          setExtraAnimals(arr => [...arr, {
            ...item,
            existing: false,
            existingCount: 0,
            isExtra: true,
            suggestedCount: startCount,
            roomToGrow: startCount,
          }]);
          setToast(`✓ Added ${item.name}`);
        }}
      />

      <CatalogBrowser
        open={showVegetableCatalog}
        onClose={() => setShowVegetableCatalog(false)}
        fullCatalog={plan?.fullVegetableCatalog || []}
        currentItems={[...(plan?.vegetables || []), ...extraVegetables]}
        userClimate={form.climate}
        kind="plants"
        onAdd={(item) => {
          setExtraVegetables(arr => [...arr, item]);
          setToast(`✓ Added ${item.name}`);
        }}
      />

      {/* SAVE DIALOG */}
      {showSaveDialog && (
        <div className="modal-backdrop" onClick={() => setShowSaveDialog(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">💾 Save This Plan</div>
            <p style={{ fontSize: 14, color: "var(--bark)", marginBottom: 14, lineHeight: 1.6 }}>
              Give your plan a name so you can find it later.
            </p>
            <label>Plan Name</label>
            <input
              type="text"
              autoFocus
              placeholder={`${form.location || "My plan"} (${form.landSize} ${form.landUnit})`}
              value={planName}
              onChange={e => setPlanName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && savePlan()}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button className="save-btn outline" style={{ flex: 1 }} onClick={() => { setShowSaveDialog(false); setPlanName(""); }}>Cancel</button>
              <button className="save-btn" style={{ flex: 1 }} onClick={savePlan}>Save Plan</button>
            </div>
            <p style={{ fontSize: 11, color: "var(--bark)", marginTop: 12, fontStyle: "italic", textAlign: "center" }}>
              Plans are saved to this browser only. Use Download for a permanent copy.
            </p>
          </div>
        </div>
      )}

      {/* SAVED PLANS DRAWER */}
      {showSaved && (
        <div className="modal-backdrop" onClick={() => setShowSaved(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">📁 My Saved Plans</div>
            {savedPlans.length === 0 ? (
              <div className="empty-state">
                No plans saved yet.<br/>
                Generate a plan and tap "Save This Plan" to keep it here.
              </div>
            ) : (
              savedPlans.map(saved => (
                <div className="saved-plan-row" key={saved.id}>
                  <div className="saved-plan-row-top">
                    <div className="saved-plan-name">{saved.name}</div>
                  </div>
                  <div className="saved-plan-meta">
                    {saved.form.landSize} {saved.form.landUnit} · {saved.form.climate} · saved {new Date(saved.savedAt).toLocaleDateString()}
                  </div>
                  <div className="saved-plan-actions">
                    <button className="mini-btn" onClick={() => loadPlan(saved)}>Open</button>
                    <button className="mini-btn danger" onClick={() => {
                      if (confirm(`Delete "${saved.name}"?`)) deletePlan(saved.id);
                    }}>Delete</button>
                  </div>
                </div>
              ))
            )}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              <button className="save-btn outline" onClick={() => setShowSaved(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


// ============= BREAK-EVEN CALCULATOR =============

const BE_STARTUP = [
  { id: "s-land",       label: "Land prep & clearing",    amt: 2000, est: "$500–$5,000"   },
  { id: "s-fencing",    label: "Fencing",                 amt: 1500, est: "$500–$4,000"   },
  { id: "s-shelter",    label: "Coop / barn / shelter",   amt: 800,  est: "$300–$3,000"   },
  { id: "s-equipment",  label: "Equipment & tools",        amt: 600,  est: "$200–$1,500"   },
  { id: "s-animals",    label: "Initial animals",          amt: 400,  est: "$100–$1,200"   },
  { id: "s-seeds",      label: "Seeds & starter plants",  amt: 150,  est: "$50–$400"      },
  { id: "s-irrigation", label: "Irrigation system",        amt: 500,  est: "$150–$2,000"   },
];
const BE_EXPENSES = [
  { id: "e-feed",       label: "Animal feed",              amt: 80,   est: "$30–$250/mo"   },
  { id: "e-vet",        label: "Vet & healthcare",         amt: 30,   est: "$10–$100/mo"   },
  { id: "e-supplies",   label: "Seeds & supplies",         amt: 40,   est: "$20–$120/mo"   },
  { id: "e-utilities",  label: "Utilities (water, power)", amt: 50,   est: "$20–$150/mo"   },
  { id: "e-fuel",       label: "Fuel & transport",         amt: 30,   est: "$15–$80/mo"    },
];
const BE_INCOME = [
  { id: "i-eggs",       label: "Egg sales",                amt: 60,   est: "$20–$150/mo"   },
  { id: "i-produce",    label: "Fresh produce",            amt: 100,  est: "$50–$350/mo"   },
  { id: "i-meat",       label: "Meat & poultry",           amt: 80,   est: "$30–$250/mo"   },
  { id: "i-dairy",      label: "Dairy products",           amt: 50,   est: "$20–$180/mo"   },
  { id: "i-herbs",      label: "Herbs & value-adds",       amt: 40,   est: "$15–$120/mo"   },
  { id: "i-market",     label: "Farmers market total",     amt: 120,  est: "$50–$500/mo"   },
];

function beInitItems(presets) {
  return presets.map(p => ({ ...p, enabled: false, custom: false }));
}

function BeItemRow({ item, onChange, onRemove }) {
  return (
    <div className="be-item-row">
      <label className="be-item-toggle">
        <input type="checkbox" checked={item.enabled}
          onChange={e => onChange({ ...item, enabled: e.target.checked })} />
        <div className="be-item-label-wrap">
          <span className="be-item-label">{item.label}</span>
          {item.est && <span className="be-item-est">est. {item.est}</span>}
        </div>
      </label>
      <div className="be-item-amt">
        <span className="be-item-dollar">$</span>
        <input type="number" min="0" value={item.amt} disabled={!item.enabled}
          onChange={e => onChange({ ...item, amt: Math.max(0, Number(e.target.value)) })}
          className="be-amt-input" />
      </div>
      {item.custom && (
        <button className="be-remove-btn" onClick={onRemove} title="Remove">×</button>
      )}
    </div>
  );
}

function BeAddRow({ placeholder, onAdd }) {
  const [label, setLabel] = useState("");
  const [amt, setAmt] = useState("");
  function commit() {
    if (!label.trim()) return;
    onAdd({ id: `c-${Date.now()}`, label: label.trim(), amt: Number(amt) || 0, enabled: true, custom: true });
    setLabel(""); setAmt("");
  }
  return (
    <div className="be-add-row">
      <input className="be-add-label-input" placeholder={placeholder}
        value={label} onChange={e => setLabel(e.target.value)}
        onKeyDown={e => e.key === "Enter" && commit()} />
      <div className="be-item-amt">
        <span className="be-item-dollar">$</span>
        <input type="number" min="0" placeholder="0" value={amt}
          onChange={e => setAmt(e.target.value)} className="be-amt-input"
          onKeyDown={e => e.key === "Enter" && commit()} />
      </div>
      <button className="be-add-btn" onClick={commit}>+ Add</button>
    </div>
  );
}

function BeChart({ netByMonth, breakEvenMonth }) {
  const W = 300, H = 150;
  const P = { t: 12, r: 10, b: 28, l: 46 };
  const cW = W - P.l - P.r, cH = H - P.t - P.b;
  const n = netByMonth.length;
  const minV = Math.min(...netByMonth, 0);
  const maxV = Math.max(...netByMonth, 0);
  const range = maxV - minV || 1;
  const x = i  => P.l + (i / (n - 1)) * cW;
  const y = v  => P.t + cH - ((v - minV) / range) * cH;
  const zy = y(0);
  const pts = netByMonth.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `M${x(0).toFixed(1)},${zy} ` +
    netByMonth.map((v, i) => `L${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ") +
    ` L${x(n-1).toFixed(1)},${zy} Z`;
  const xLabels = [0,12,24,36,48,60].filter(m => m < n);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto", display:"block" }}>
      <defs>
        <clipPath id="be-above"><rect x={P.l} y={P.t} width={cW} height={Math.max(0,zy-P.t)} /></clipPath>
        <clipPath id="be-below"><rect x={P.l} y={zy} width={cW} height={Math.max(0,cH-(zy-P.t))} /></clipPath>
      </defs>
      <path d={area} fill="rgba(74,94,58,0.13)"  clipPath="url(#be-above)" />
      <path d={area} fill="rgba(181,69,27,0.10)" clipPath="url(#be-below)" />
      <line x1={P.l} y1={zy} x2={W-P.r} y2={zy} stroke="rgba(92,61,46,0.22)" strokeWidth="1" strokeDasharray="3 3" />
      <polyline points={pts} fill="none" stroke="#4a5e3a" strokeWidth="2" strokeLinejoin="round" />
      {breakEvenMonth !== null && breakEvenMonth < n && (
        <g>
          <line x1={x(breakEvenMonth)} y1={P.t} x2={x(breakEvenMonth)} y2={H-P.b}
            stroke="#e8b84b" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={x(breakEvenMonth)} cy={zy} r="4" fill="#e8b84b" stroke="white" strokeWidth="1.5" />
        </g>
      )}
      {xLabels.map(m => (
        <text key={m} x={x(m)} y={H-6} textAnchor="middle" fontSize="9" fill="#5c3d2e" fontFamily="Lato,sans-serif">
          {m === 0 ? "Now" : `${m/12}yr`}
        </text>
      ))}
      {[minV, 0, maxV].filter((v,i,a) => a.findIndex(u=>Math.abs(u-v)<range*0.04)===i).map(v => (
        <text key={v} x={P.l-4} y={y(v)+3} textAnchor="end" fontSize="8" fill="#5c3d2e" fontFamily="Lato,sans-serif">
          {v===0 ? "$0" : v>0 ? `+$${(v/1000).toFixed(v<10000?1:0)}k` : `-$${(-v/1000).toFixed(-v<10000?1:0)}k`}
        </text>
      ))}
    </svg>
  );
}

function BreakEvenCalculator() {
  const [startup,  setStartup]  = useState(() => beInitItems(BE_STARTUP));
  const [expenses, setExpenses] = useState(() => beInitItems(BE_EXPENSES));
  const [income,   setIncome]   = useState(() => beInitItems(BE_INCOME));

  const upd = (setter, id, next) => setter(arr => arr.map(it => it.id === id ? next : it));
  const rem = (setter, id)       => setter(arr => arr.filter(it => it.id !== id));
  const add = (setter, item)     => setter(arr => [...arr, item]);

  const totalStartup   = startup.filter(i=>i.enabled).reduce((s,i)=>s+i.amt,0);
  const monthlyExpense = expenses.filter(i=>i.enabled).reduce((s,i)=>s+i.amt,0);
  const monthlyIncome  = income.filter(i=>i.enabled).reduce((s,i)=>s+i.amt,0);
  const monthlyNet     = monthlyIncome - monthlyExpense;
  const beMonth        = monthlyNet > 0 ? Math.ceil(totalStartup / monthlyNet) : null;
  const MONTHS         = 61;
  const netByMonth     = Array.from({length:MONTHS},(_,m) => monthlyIncome*m - monthlyExpense*m - totalStartup);

  const fmt = n => "$" + Math.abs(Math.round(n)).toLocaleString();
  const fmtNet = n => (n>=0?"+":"-") + fmt(n);
  const fmtDur = m => {
    if (m <= 0) return "Already profitable";
    const y = Math.floor(m/12), mo = m%12;
    return [y&&`${y} yr${y>1?"s":""}`, mo&&`${mo} mo`].filter(Boolean).join(" ");
  };

  const hasAny = totalStartup>0 || monthlyNet!==0;

  return (
    <div className="be-shell">

      {/* ── INPUTS ── */}
      <div className="be-inputs">

        <div className="be-section">
          <div className="be-section-header">
            <span className="be-section-icon">🏗️</span>
            <div>
              <div className="be-section-title">Startup Costs</div>
              <div className="be-section-sub">One-time investments to get started</div>
            </div>
            <div className="be-section-total">{fmt(totalStartup)}</div>
          </div>
          {startup.map(it => (
            <BeItemRow key={it.id} item={it}
              onChange={next => upd(setStartup, it.id, next)}
              onRemove={() => rem(setStartup, it.id)} />
          ))}
          <BeAddRow placeholder="e.g. Water tank" onAdd={it => add(setStartup, it)} />
        </div>

        <div className="be-section">
          <div className="be-section-header">
            <span className="be-section-icon">📉</span>
            <div>
              <div className="be-section-title">Monthly Expenses</div>
              <div className="be-section-sub">Recurring costs every month</div>
            </div>
            <div className="be-section-total">{fmt(monthlyExpense)}<span className="be-section-total-unit">/mo</span></div>
          </div>
          {expenses.map(it => (
            <BeItemRow key={it.id} item={it}
              onChange={next => upd(setExpenses, it.id, next)}
              onRemove={() => rem(setExpenses, it.id)} />
          ))}
          <BeAddRow placeholder="e.g. Insurance" onAdd={it => add(setExpenses, it)} />
        </div>

        <div className="be-section">
          <div className="be-section-header">
            <span className="be-section-icon">📈</span>
            <div>
              <div className="be-section-title">Monthly Income</div>
              <div className="be-section-sub">What your homestead earns</div>
            </div>
            <div className="be-section-total be-section-total--income">{fmt(monthlyIncome)}<span className="be-section-total-unit">/mo</span></div>
          </div>
          {income.map(it => (
            <BeItemRow key={it.id} item={it}
              onChange={next => upd(setIncome, it.id, next)}
              onRemove={() => rem(setIncome, it.id)} />
          ))}
          <BeAddRow placeholder="e.g. CSA shares" onAdd={it => add(setIncome, it)} />
        </div>

      </div>

      {/* ── RESULTS ── */}
      <div className="be-results">
        <div className="be-results-inner">
          <div className="be-results-title">Break-Even Analysis</div>

          {!hasAny ? (
            <p className="be-empty">Check items on the left to build your projection.</p>
          ) : (
            <>
              <div className="be-metric-row">
                <div className="be-metric">
                  <div className="be-metric-label">Monthly Net</div>
                  <div className={`be-metric-value ${monthlyNet>=0?"be-pos":"be-neg"}`}>
                    {fmtNet(monthlyNet)}
                  </div>
                </div>
                <div className="be-metric">
                  <div className="be-metric-label">Startup Cost</div>
                  <div className="be-metric-value">{fmt(totalStartup)}</div>
                </div>
              </div>

              <div className="be-be-box">
                {beMonth === null ? (
                  <div className="be-be-impossible">
                    <div className="be-be-dash">—</div>
                    <div className="be-be-note">
                      {monthlyNet < 0
                        ? "Monthly expenses exceed income — reduce costs or add revenue"
                        : "Add startup costs and some income to calculate break-even"}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="be-be-num">{fmtDur(beMonth)}</div>
                    <div className="be-be-label">to break even</div>
                    <div className="be-be-sub">
                      Month {beMonth} · {new Date(Date.now() + beMonth*30.44*24*60*60*1000)
                        .toLocaleDateString("en-US",{month:"long",year:"numeric"})}
                    </div>
                  </>
                )}
              </div>

              <div className="be-chart-label">Net Position Over 5 Years</div>
              <BeChart netByMonth={netByMonth} breakEvenMonth={beMonth} />

              <div className="be-proj-grid">
                {[[12,"1 Year"],[36,"3 Years"],[60,"5 Years"]].map(([m,lbl]) => {
                  const v = netByMonth[m];
                  return (
                    <div key={m} className={`be-proj-card ${v>=0?"be-pos-card":"be-neg-card"}`}>
                      <div className="be-proj-label">{lbl}</div>
                      <div className="be-proj-val">{fmtNet(v)}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============= ANIMAL CARE CALENDAR =============

const ACC_TASK_TYPES = {
  health:      { icon: "🩺", label: "Health",      color: "#b5451b", bg: "rgba(181,69,27,0.08)"   },
  feeding:     { icon: "🌾", label: "Feeding",     color: "#7a5c1e", bg: "rgba(200,169,110,0.15)"  },
  breeding:    { icon: "💕", label: "Breeding",    color: "#6a3e78", bg: "rgba(122,74,110,0.09)"   },
  maintenance: { icon: "🔧", label: "Maintenance", color: "#3d2b1f", bg: "rgba(92,61,46,0.08)"     },
  seasonal:    { icon: "🌡️", label: "Seasonal",   color: "#1e6a8e", bg: "rgba(46,110,142,0.08)"   },
  grooming:    { icon: "✂️", label: "Grooming",    color: "#3a5e2a", bg: "rgba(74,94,58,0.09)"     },
};

const ACC_MONTH_NAMES  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const ACC_MONTH_SHORT  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const tH = t => ({ type: "health",      text: t });
const tF = t => ({ type: "feeding",     text: t });
const tB = t => ({ type: "breeding",    text: t });
const tM = t => ({ type: "maintenance", text: t });
const tS = t => ({ type: "seasonal",    text: t });
const tG = t => ({ type: "grooming",    text: t });

const ACC_ANIMALS = [
  {
    id: "chickens", name: "Chickens", emoji: "🐓", accent: "#e8b84b",
    months: [
      [tF("Increase feed ~10% — hens burn more calories staying warm in cold"), tM("Check water heaters daily; frozen water stops laying fast"), tS("Run 14–16 hrs of artificial light to maintain winter egg production")],
      [tH("Inspect combs for frostbite; apply petroleum jelly as prevention"), tB("Order spring chicks now — hatcheries fill up by March"), tM("Deep-clean and disinfect coop while flock is at its smallest")],
      [tB("Set up brooder before chicks arrive: 95°F week 1, drop 5°F each week"), tH("First lice and mite check of the year; treat if found"), tF("New chicks need 20–22% protein chick starter, not layer pellets")],
      [tM("Spring coop cleaning: replace all bedding, scrub surfaces, check hardware cloth"), tH("Check for worms; inspect birds for external parasites"), tF("Transition flock to pasture gradually to avoid digestive upset")],
      [tH("Check for bumblefoot (swollen, scabbed pads) while handling birds"), tF("Peak laying = peak nutrition — quality layer pellets available at all times"), tS("Set up shade and extra waterers before summer heat arrives")],
      [tS("Provide shade, ventilation, and cold water — heat stress kills layers"), tF("Reduce scratch grain in summer; it generates body heat"), tH("Watch for panting, drooping wings, pale combs — signs of heat stroke")],
      [tS("Freeze fruit and veggie treats as cooling snacks; keep water icy cold"), tH("Red mites thrive in heat — treat coops at dusk when mites are active"), tM("Maximize coop ventilation; open vents and add fans if needed")],
      [tH("Molt season begins — reduced laying is normal, not illness"), tF("Add extra protein (mealworms, gamebird feed) to support feather regrowth"), tM("Repair and paint coop while weather is dry before fall rains")],
      [tB("Evaluate flock: cull non-layers before winter feed costs mount"), tM("Weatherize coop: seal drafts, check roof, start deep litter method"), tF("Reintroduce scratch grains to help build fat reserves before cold")],
      [tS("Restart supplemental lighting — 14 hrs/day to prevent winter egg drop"), tM("Add 6–8 inches of bedding for composting warmth through winter"), tH("Watch for respiratory illness as damp autumn weather sets in")],
      [tF("Warm oatmeal mash on cold mornings boosts calories and morale"), tH("Annual internal parasite check before winter — fecal float test"), tM("Insulate water founts; switch to heated base when temps drop below freezing")],
      [tM("Maintain deep bedding; ensure ventilation — moisture causes more harm than cold"), tF("High-energy treats like sunflower seeds help hens stay warm overnight"), tS("Plan next year's flock: breeds, replacements, and hatchery orders")],
    ]
  },
  {
    id: "ducks", name: "Ducks", emoji: "🦆", accent: "#7ab8d4",
    months: [
      [tM("Ensure water is unfrozen daily — ducks must dunk bills to clear sinuses"), tS("Provide wind-blocking shelter; ducks tolerate cold better than chickens"), tF("Increase layer pellets slightly for cold-weather energy maintenance")],
      [tB("Ducks often begin laying in February — provide low ground-level nesting boxes"), tH("Check bills and feet for frostbite in extreme cold"), tM("Collect eggs frequently; they lay early morning and eggs freeze quickly")],
      [tB("Incubate duck eggs at 99.5°F, 55–65% humidity for 28 days"), tF("Ducklings can swim supervised from day 1 — don't leave unattended"), tM("Clean pond or kiddie pool weekly; ducks foul water very quickly")],
      [tH("First parasite check of season; ducks are generally hardy but check for lice"), tM("Spring-clean duck house; rake and compost soiled bedding"), tF("Transition to pasture — ducks are excellent foragers and natural slug hunters")],
      [tF("Supplement niacin via brewer's yeast if feeding chicken feed — ducks need 3× the niacin"), tB("Set hatching eggs if breeding a second clutch"), tS("Install shade over swimming area before summer heat arrives")],
      [tS("Ducks handle heat well with access to swimming water — keep pool fresh daily"), tH("Watch for Angel Wing in ducklings: caused by excess protein; switch to 15–16% feed"), tM("Maintain clean swimming water to prevent bacterial bloom in summer heat")],
      [tS("Keep pool clean and cool — ducks regulate temperature through water"), tF("Fresh garden greens and slugs are a welcome and nutritious summer treat"), tH("Check for bumblefoot if ducks are kept on hard or rough ground")],
      [tH("Late summer molt — reduced egg production is entirely normal"), tM("Drain and deep-clean pond or pool thoroughly; algae peaks in summer heat"), tB("Evaluate breeding stock; note best layers and temperament for next year")],
      [tM("Repair and weatherize duck house before fall rains"), tF("Restore full layer ration as molt ends and laying resumes"), tH("Deworm if on a rotation program; fecal check recommended this time of year")],
      [tF("Increase calories as temps drop; ducks forage outside more than chickens"), tM("Prepare heated water station; ducks need liquid water access year-round"), tB("Evaluate and finalize flock size before winter feeding costs rise")],
      [tS("Ducks can and will forage in snow — let them choose outdoor time themselves"), tM("Add extra bedding in shelter for warmth; ducks don't perch so floor warmth matters"), tH("Monitor feet in freezing mud — foot rot is a real risk in wet winter conditions")],
      [tM("Daily water management is critical — unfrozen access required every day"), tF("High-energy feed supplement in extreme cold keeps weight and egg production up"), tS("Ducks love playing in first snow — healthy activity; ensure shelter is dry afterward")],
    ]
  },
  {
    id: "rabbits", name: "Rabbits", emoji: "🐰", accent: "#c8a96e",
    months: [
      [tM("Check water twice daily — bottles freeze before bowls; use crocks in winter"), tS("Add generous nesting material; rabbits stay warmer than expected but comfort matters"), tH("Watch for snuffles (respiratory illness) in cold, damp conditions — nasal discharge is a red flag")],
      [tB("Begin breeding for March litters; doe gestation is 28–31 days"), tM("Prepare nest boxes: fill with hay 3 days before expected kindle date"), tH("Pre-breeding health check: weight, teeth alignment, reproductive condition")],
      [tB("First litters born; check kits daily but minimize handling for first 7–10 days"), tH("Watch for mastitis in does; check nipples for heat, swelling, or hardness"), tM("Keep nest box clean; remove soiled bedding carefully without disturbing kits")],
      [tB("Wean kits at 4–6 weeks onto pellets and hay; separate by sex at 8 weeks"), tH("Spring health check: teeth, weight, coat condition, eye clarity"), tF("Transition does back to breeding ration after weaning is complete")],
      [tB("Peak breeding season; healthy does can kindle every 35–42 days"), tS("Monitor temperatures — rabbits begin to stress above 85°F"), tM("Clean and sanitize all hutches as mud season dries up")],
      [tS("HEAT IS CRITICAL — rabbits die rapidly above 104°F core temperature"), tM("Place frozen 2-liter bottles in cages for cooling; move hutches to shade immediately"), tF("Reduce pellets slightly in heat; increase hay and fresh leafy greens")],
      [tS("Suspend breeding — heat stress causes high kit mortality and doe distress"), tM("Multiple frozen bottles, fans, and misters — check animals every few hours on hot days"), tH("Purple or flushed ear veins signal overheating; cool with damp towel immediately")],
      [tS("Continue heat protocols as needed through late summer"), tB("Resume light breeding as evenings cool in late August"), tH("Post-summer health check; weight loss from heat stress is common — supplement if thin")],
      [tB("Fall breeding — excellent conception rates as temperatures cool"), tM("Transition hutches back to full sun exposure for natural warmth"), tH("Check for ear mites (dark waxy debris); deworm if on a rotation schedule")],
      [tB("Strong fall litters; good weather for kit survival and growth"), tM("Prepare winter hutch insulation; block prevailing wind while maintaining ventilation"), tF("Increase pellet ration slightly as cold arrives to support body condition")],
      [tB("Late breeding — ensure kits are born before deep cold sets in"), tM("Nest boxes back in full time; increase hay depth for insulation"), tH("Check for sore hocks on wire floors; add resting boards or mats where needed")],
      [tM("Reliable water supply is the #1 winter priority — check bottles multiple times daily"), tF("Extra pellets and generous hay for warmth; cold rabbits need significantly more calories"), tH("Year-end health review; record breeding performance and plan any culls or additions")],
    ]
  },
  {
    id: "goats", name: "Goats", emoji: "🐐", accent: "#9dc183",
    months: [
      [tB("Peak kidding if fall-bred — kids need colostrum within 1 hour of birth"), tF("Increase grain for late-pregnant and lactating does — 1 lb/day per head of milk produced"), tH("Watch for pregnancy toxemia (ketosis) in heavy does approaching their due date")],
      [tB("Kidding continues; keep area dry and draft-free — hypothermia kills newborns fast"), tH("CDT booster for does 4 weeks before kidding; kids need CDT at 4 and 8 weeks"), tM("Fresh, dry bedding is critical — wet kidding areas spread scours and infection")],
      [tH("Vaccinate kids: CDT at 4 weeks, booster at 8 weeks"), tG("Disbud kids at 3–7 days old; delayed disbudding causes scurs and is harder on kids"), tF("Transition herd to spring pasture slowly — rapid lush grass change causes bloat")],
      [tH("FAMACHA scoring for barber pole worm — check eyelid color; treat at score 3 or below"), tM("Hoof trimming — overgrown hooves cause lameness on wet spring ground"), tF("Monitor for grass tetany on lush pasture; supplement magnesium if needed")],
      [tH("Parasite pressure peaks — rotate pastures every 7–10 days; FAMACHA weekly"), tF("Peak milk production — support with quality hay, kelp, and loose minerals free-choice"), tM("Goats excel at brush and weed clearing — rotate them through overgrown areas")],
      [tG("Shear Angora or Cashmere goats before summer if not done in spring"), tH("Watch for pinkeye — spreads fast via flies; isolate affected animals immediately"), tS("Provide shade and fresh water; goats are more heat-sensitive than they appear")],
      [tS("Spring kids are at weaning age — adjust doe rations down as milk demand drops"), tH("Summer FAMACHA checks every 2 weeks; barber pole worm pressure peaks in heat and humidity"), tM("Trim feet again if hooves have grown fast on wet or lush ground")],
      [tB("Bucks come into rut — separate from does unless breeding; bucks become smelly and aggressive"), tF("Flush does before breeding: increase grain 2 weeks before buck introduction for better conception"), tH("Pre-breeding health check; treat parasite issues before does are bred")],
      [tB("Breeding season — mark does when bred; gestation is 145–155 days"), tH("Annual CDT booster for whole herd if not done in spring"), tM("Calculate hay needs for winter: 30–50 lbs per goat per month is a typical estimate")],
      [tB("Confirm pregnancies via ultrasound or observe for repeat heats 21 days after breeding"), tF("Early pregnancy = maintenance ration; late pregnancy = begin increasing grain"), tM("Hoof trimming before winter — clean hooves are far less prone to foot rot")],
      [tF("Late pregnancy nutrition: increase grain for does in their last 6 weeks of gestation"), tH("Watch for urinary calculi in wethers — maintain 2:1 calcium-to-phosphorus ratio in feed"), tM("Prepare and clean kidding area: insulated, bright, close to the house for easy night checks")],
      [tF("Final pre-kidding nutrition push; selenium/vitamin E injection if in a deficient region"), tH("Gather kidding supplies: iodine, feeding tube, clean towels, heat lamp, colostrum backup"), tB("Know your due dates; check does every 4 hours as dates approach; night checks are worth it")],
    ]
  },
  {
    id: "pigs", name: "Pigs", emoji: "🐷", accent: "#f4a0a0",
    months: [
      [tM("Deep straw or hay bedding is essential — pigs burrow and build nests for warmth"), tF("Increase feed 10–15% in cold; pigs burn significant calories just staying warm"), tH("Check for frostbitten ears; shelter must be draft-free but not completely airtight")],
      [tB("Prepare farrowing area if sows are due — heat lamp, creep space, anti-crush rail"), tH("Check piglet birth weights; small pigs need supplemental feeding to survive"), tM("Farrowing area: 70–75°F for sow, 85–90°F for piglets under heat lamp")],
      [tB("Wean piglets at 6–8 weeks; move boar out if not planning another breeding"), tH("Vaccinate piglets per vet protocol; iron injection at 3 days old prevents anemia"), tF("Transition weaners to starter ration; watch for post-weaning diarrhea carefully")],
      [tM("Move to outdoor paddocks as ground firms up; rotate regularly to prevent parasite buildup"), tH("Deworming rotation if on a program; spring is a good time for fecal checks"), tF("Pigs on good pasture can have grain reduced 20–30% if forage quality is high")],
      [tM("Establish wallow (mud pit) before hot weather — pigs cannot sweat and need mud to cool"), tH("Light-skinned breeds can sunburn badly; mud acts as their natural sunscreen"), tF("Peak forage season — supplement pasture with grain for growth rate targets")],
      [tS("Wallow management is critical — refresh mud regularly; pigs regulate temperature entirely via mud"), tH("Watch for heat stress: rapid open-mouth breathing, reluctance to move are warning signs"), tF("Fresh water multiple times daily in heat; a 250-lb pig needs 4–6 gallons per day in summer")],
      [tS("Hottest month — pigs are highly vulnerable to heat; shade is absolutely non-negotiable"), tM("Misters or sprinklers over lounging area significantly reduce dangerous heat stress"), tF("Feed in coolest parts of day — early morning and after sunset")],
      [tF("Market pigs approach finish weight around 250 lbs live at 5–7 months"), tB("Plan fall breeding if producing winter piglets; gilts need to be 7+ months old"), tH("Final health check before processing; confirm medication withdrawal times are clear")],
      [tB("Fall breeding; gilts should be 7+ months, 250+ lbs for first breeding"), tM("Plan winter shelter improvements; pigs confined in winter need generous space"), tF("Acorn and windfall fruit season — excellent free-range supplement for foraging pigs")],
      [tM("Harvest excess stock before winter feed costs rise sharply"), tF("Adjust rations as temps cool; increase caloric density for remaining animals"), tH("Pre-winter deworming; treat for mange if skin appears rough, red, or itchy")],
      [tM("Prepare and fortify winter housing; add extra deep bedding daily as cold sets in"), tF("Winter pigs need 15–20% more feed than summer pigs for the same growth rate"), tH("Watch for respiratory illness in cold, damp, poorly ventilated housing")],
      [tM("Maintain deep litter pack — composting bedding generates significant warmth from below"), tF("High-quality feed and fresh bedding keep confined pigs comfortable and growing well"), tS("Check water twice daily — pigs need 1–1.5 gallons per 100 lbs of bodyweight per day")],
    ]
  },
  {
    id: "cattle", name: "Cattle", emoji: "🐄", accent: "#a0785a",
    months: [
      [tB("Calving watch if fall-bred — be prepared to assist in cold weather; hypothermia kills fast"), tF("Supplement hay with protein tubs or blocks; dry winter hay has low protein and energy"), tM("Check water tank heaters daily; cattle need 20–30 gallons per head per day, more in cold")],
      [tB("Peak calving for spring-calving herds; keep a 24-hour calving watch during peak"), tH("Calf scours is the top killer of newborns — treat immediately with electrolytes"), tF("Increase feed for cows nursing newborns; energy demand nearly doubles post-calving")],
      [tH("Vaccinate calves at 2–3 months: Blackleg, IBR, BVD per vet recommendation"), tB("Castrate bull calves and apply ear tags before 2 months old for easiest handling"), tF("Careful spring grass transition — frothy bloat risk is real on lush legume-heavy pastures")],
      [tM("Begin rotational grazing — rest paddocks 30–60 days between grazing to rebuild grass"), tF("Remove winter protein supplements as grass reaches 6–8 inches and becomes nutritious"), tH("Spring pour-on for lice and emerging flies before populations build")],
      [tH("Breeding season for spring-calving herds — bulls in with cows for 60–90 days"), tM("Check and test all electric fences before full pasture season begins"), tH("Monitor body condition: breeding cows should be BCS 5–6 on a 9-point scale")],
      [tH("Fly control — pour-ons, back rubbers, or fly tags applied now; prevent pinkeye spread"), tH("Watch for repeat heats 21 days after bull introduction — indicates non-conception"), tS("Provide shade access; heat stress significantly reduces conception rates during breeding")],
      [tS("Heat stress peaks — cattle stop eating during peak heat; feed at dusk and early morning"), tH("Pinkeye watch — flies spread it rapidly; treat early with antibiotic eye ointment"), tM("Rotate pastures on a tight schedule to prevent overgrazing as summer grasses slow")],
      [tB("Wean calves at 6–8 months and 500–600 lbs target weight"), tH("Pregnancy test cows after bull removal — cull open cows before winter to save feed"), tF("Body-condition cows before winter — target BCS 5–6; thin cows need grain now not later")],
      [tH("Fall vaccinations: Blackleg booster, respiratory complex, leptospirosis"), tM("Inventory hay supply — plan on 1.5–2% of bodyweight per day for the whole winter"), tH("Watch for hardware disease when cleaning up field trash before tilling or seeding")],
      [tM("Pregnancy-check bred heifers; identify and cull open animals before winter"), tF("Transition to hay as grass declines; introduce new hay slowly over 2 weeks"), tH("Lice prevention pour-on in fall — lice thrive in winter hair coats and spread rapidly")],
      [tF("Full winter hay feeding in cold regions: 25–30 lbs per cow per day minimum"), tM("Check all fencing before snow covers electric wire ground posts and makes repairs hard"), tH("Body condition check — thin cows in late pregnancy need grain supplement immediately")],
      [tB("Late-pregnant cows need close attention — calving supplies stocked and ready to go"), tF("High-quality hay is critical in the final trimester — fetal growth peaks now"), tM("Clear manure from feeding areas to prevent dangerous slip-and-fall injuries on ice")],
    ]
  },
  {
    id: "sheep", name: "Sheep", emoji: "🐑", accent: "#d4e8f0",
    months: [
      [tB("Ewes in late pregnancy — prepare lambing area; watch for signs of labor"), tF("Pre-lambing energy boost: 0.5 lb grain/day per ewe in the last 4 weeks"), tH("Watch for pregnancy toxemia in heavy ewes — drench with propylene glycol if off feed")],
      [tB("Peak lambing — monitor for malpresentations; have OB gloves and lubricant on hand"), tH("Newborns need colostrum within 2 hours; hypothermia is the #1 lamb killer"), tM("Keep lambing area dry, clean, and draft-free — grafting orphan lambs to ewes that lost lambs")],
      [tH("CDT vaccination for lambs at 3–4 weeks and booster 4 weeks later"), tB("Castrate and ear-tag ram lambs while still young and easy to handle"), tG("Crutch ewes (trim wool around udder and tail) to keep nursing area clean")],
      [tH("Start FAMACHA scoring — check inner eyelid color monthly through fall"), tM("Hoof trimming — wet spring conditions promote foot rot; check between toes carefully"), tF("Transition to pasture slowly; sudden lush grass causes pulpy kidney in lambs")],
      [tG("SHEARING SEASON — shear before flies get active and before temperatures climb"), tH("Check for fly strike after shearing; keep wool around breech trimmed short"), tM("Ear tag, record, and draft flock after shearing — ideal time for full inventory review")],
      [tH("Fly strike (blowfly) prevention — high risk on warm, humid days; check backsides daily"), tF("Ewes on good summer pasture can reduce or eliminate grain supplementation"), tM("Pasture rotation every 3–5 days to break internal parasite lifecycle")],
      [tH("FAMACHA biweekly — barber pole worm peaks in summer heat and humidity"), tS("Provide shade and fresh water — sheep in fleece overheat more easily than they look"), tB("Evaluate ewes for next year's breeding; cull poor mothers and consistently low producers")],
      [tB("Flush ewes: increase grain 2–3 weeks before ram introduction for higher twin rates"), tH("Pre-breeding deworming only if FAMACHA score warrants — avoid overuse, resistance is rising"), tG("Hoof trimming before rams go in — easier when all sheep are gathered in one place anyway")],
      [tB("Ram introduction — mark his chest with raddle crayon to identify bred ewes"), tH("Breeding soundness exam for ram before season: feet, teeth, body condition, libido"), tF("Bred ewes on maintenance ration; early pregnancy has lower nutritional requirements")],
      [tB("Change raddle color halfway through to identify ewes that cycle late"), tH("Schedule annual CDT boosters for ewes 4 weeks before lambing — plan the date now"), tM("Hay stores check — sheep need 4–6 lbs of hay per head per day throughout winter")],
      [tF("Mid-pregnancy nutrition — quality hay is the priority; excess grain causes fat lambs and hard births"), tH("Hoof check and trim — lame ewes entering winter lose body condition fast"), tM("Prepare lambing jugs (small bonding pens) in advance; stock all supplies before January")],
      [tB("Mark ewes with expected lamb dates based on raddle records"), tF("Last 6 weeks of pregnancy: increase grain to 0.5–1 lb/day as lamb growth accelerates"), tH("Selenium and vitamin E deficiency is common — blood test or blanket injection if in a deficient area")],
    ]
  },
  {
    id: "bees", name: "Honeybees", emoji: "🐝", accent: "#f5c842",
    months: [
      [tM("Do NOT open the hive — cold air breaks the winter cluster and can kill the colony"), tM("Heft the hive from behind; a light hive means starvation risk — add emergency feed"), tS("Ensure top ventilation: condensation kills winter clusters faster than cold does")],
      [tF("Place a candy board or fondant above the cluster if hive weight is concerning"), tH("Watch for cleansing flights on warm days above 50°F — this is normal healthy behavior"), tM("Check for mouse entry; mice destroy comb and frames if they establish a nest inside")],
      [tH("First full inspection when sustained temperatures reach 55°F+ — check for queen and brood"), tM("Replace moldy or damaged frames; add a second super if population is growing"), tB("Look for swarm cells along bottom of frames — early splits prevent losing half your colony")],
      [tB("SWARM PREVENTION MONTH — add space, make splits, or requeen before they leave"), tH("First Varroa mite alcohol wash of the year — treat if above 2 mites per 100 bees"), tM("Reverse brood boxes if running two-story Langstroth to equalize population distribution")],
      [tF("Peak nectar flow — add honey supers promptly; full supers trigger swarming"), tH("Second Varroa check — treat only if threshold exceeded; don't treat during active honey flow"), tM("Monitor weekly during peak flow; split or add supers as population explodes rapidly")],
      [tF("Harvest early honey supers if frames are 80%+ capped; leave uncapped frames"), tH("Post-nectar-flow Varroa treatment if you're done collecting honey from those supers"), tB("Requeen failing colonies — a new queen improves temperament and disease resistance")],
      [tS("Summer dearth begins — bees may rob weaker hives; reduce entrances as needed"), tM("Keep a fresh water source nearby; bees use water to cool the hive through evaporation"), tH("Watch for small hive beetles in warm climates; traps placed inside frames help")],
      [tH("CRITICAL: Treat for Varroa mites after honey harvest — mite levels peak in fall bees"), tF("Assess winter stores — bees need 60–80 lbs of honey to survive a full winter"), tM("Reduce entrance to mouse-guard size; add robbing screen if summer dearth continues")],
      [tH("Final Varroa treatment if mite count is still elevated after August treatment"), tF("Feed 2:1 sugar syrup to supplement stores if hive weight is below target"), tM("Last thorough inspection before winter prep; confirm queen is present and actively laying")],
      [tM("Insulate top of hive; install mouse guard; add entrance reducer for winter"), tF("Stop feeding syrup when nighttime temps consistently drop below 50°F — switch to solid fondant"), tH("Heft hive to assess stores one final time before cold weather arrives to stay")],
      [tM("Minimal disturbance — check externally only; a pile of dead bees outside is normal"), tS("Ensure top ventilation: upper entrance or moisture quilt keeps condensation off the cluster"), tH("A quiet hive in cold weather is a healthy hive — resist every urge to open it")],
      [tM("Monitor hive weight monthly by hefting — a light hive in December needs emergency candy board"), tS("Snow can insulate hives naturally — don't brush it off unless it fully blocks the entrance"), tH("Plan next year now: order packages or nucleus colonies early — quality sources sell out by January")],
    ]
  },
  {
    id: "turkeys", name: "Turkeys", emoji: "🦃", accent: "#b5451b",
    months: [
      [tM("Provide cold shelter with deep bedding; turkeys are hardy but still need wind protection"), tF("High-protein feed at 22–24% protein maintains feather condition through winter"), tH("Keep turkeys separated from chickens — blackhead disease spreads through chicken droppings")],
      [tB("Order poults now — heritage breeds sell out by March and ship May through July"), tM("Plan brooder setup: turkeys need 100°F in week 1 and significantly more space than chicks"), tH("Breeding toms begin display behavior — monitor flock dynamics and separate if fighting")],
      [tB("If keeping a breeding flock: toms and hens together now; collect and set fertile eggs"), tM("Order from hatcheries for May–June delivery — this is the last reliable ordering month"), tH("Annual health check for breeding birds: weight, feet, wattles, eyes, overall condition")],
      [tB("Poults from spring orders begin arriving — have brooder ready before they ship"), tM("Brooder at 95–100°F, non-slip floor, turkey-specific starter feed at 28% protein"), tH("Poult warning: they drown easily in water, pile and smother, and are fragile — check hourly")],
      [tB("Poults at 4–6 weeks old: begin transitioning to outdoor pen with full overhead predator cover"), tF("Grower feed: 26–28% protein for broad-breasted; 20–22% for heritage breeds growing more slowly"), tH("Maintain blackhead separation from chickens or use medicated feed where legally permitted")],
      [tM("Full outdoor access with secure predator protection — turkeys are high-value targets"), tF("Supplement with high-protein treats: mealworms, soldier fly larvae, garden insects"), tH("Isolate any bird with nasal discharge immediately — respiratory infections spread fast in flocks")],
      [tS("Shade and plenty of fresh water — turkeys handle heat less efficiently than chickens"), tF("Broad-breasted market birds on track: reach 25–30 lbs at 16–20 weeks of age"), tH("Final health assessment for Thanksgiving birds; ensure no medications with active withdrawal times")],
      [tB("Broad-breasted birds approaching processing weight; schedule butcher appointments now"), tM("Heritage breeds continue growing — toms need 28+ weeks to reach full market weight"), tH("Stop feed 12 hours before processing day for easier processing and cleaner carcasses")],
      [tB("Broad-breasted processing for October pickup and early Thanksgiving orders"), tM("Heritage toms may reach 20–25 lbs and hens 12–16 lbs at 28+ weeks"), tF("Reduce feed 2 weeks before processing to improve feed conversion and finish quality")],
      [tB("Thanksgiving bird processing — schedule harvest for week of November 20–24"), tM("Final harvest of all market birds not kept for breeding stock next year"), tH("Keep breeding flock healthy through harvest season — they carry next year's genetics")],
      [tB("Breeding toms and hens into winter housing; separate toms to reduce stress on hens"), tM("Deep-clean all grow-out areas before next spring; rotate pasture areas if possible"), tH("Check for lice and mites as birds transition into closer winter housing conditions")],
      [tB("Rest breeding flock through December; plan next year's production goals and breed selection"), tM("Maintenance and repair of all brooder and grow-out equipment during the off-season"), tF("Reduce breeding flock to maintenance ration only — they need minimal calories in winter rest")],
    ]
  },
  {
    id: "horses", name: "Horses", emoji: "🐴", accent: "#8a6d30",
    months: [
      [tF("Increase hay in cold — horses need 1.5–2% of body weight in forage daily; more in extreme cold"), tM("Check water daily; horses will colic before they drink icy or near-frozen water"), tG("Thick winter coat is a natural thermometer — only blanket if horse is clipped, elderly, or thin")],
      [tH("Schedule dental float — worn or sharp teeth mean poor hay utilization, especially in older horses"), tH("Deworming rotation per fecal egg count — targeted treatment is far better than calendar dosing"), tM("Body condition score through the winter coat; add grain now if ribs are easy to feel")],
      [tG("Spring shedding — daily grooming with a shedding blade removes dead coat and checks for skin issues"), tF("Spring grass CAUTION: introduce pasture over 2–3 weeks — sudden grass access causes laminitis"), tM("Check for mud fever (scratches) on lower legs — clean, dry, and treat with zinc oxide cream")],
      [tH("Spring vaccinations: EEE/WEE, West Nile, Flu/Rhino, Tetanus, Rabies — consult your vet"), tM("Farrier appointment for hoof trimming or shoeing — winter hooves are often long and unbalanced"), tF("Pregnant mares on fescue: move to clean grass 60–90 days before foaling to avoid fescue toxicosis")],
      [tH("Second deworming per fecal egg count — never skip the count, resistance is a real problem"), tM("Begin pasture rotation; rest paddocks 30 days between grazing to maintain grass health"), tS("Fly protection program begins: masks, sheets, permethrin spray, and leg wraps as needed")],
      [tS("Fly sheet and mask daily if horse shows irritation; check under sheet for rubbing and sweat"), tF("Electrolytes in water or top-dressed on feed during heat waves to encourage drinking"), tH("Watch for summer sores around wounds and lips — caused by Habronema larvae deposited by flies")],
      [tS("Peak heat: ride only in early morning or after sunset; watch for anhidrosis — inability to sweat"), tF("Ensure minimum 5 gallons of water per day per horse in heat; working horses need significantly more"), tH("Bot fly yellow eggs appear on legs and belly — remove weekly with a bot knife; interrupt the lifecycle")],
      [tG("Bot egg removal from legs, jaw, and belly using a fine-toothed comb or warm water"), tH("Fecal egg count before fall deworming — use targeted selective treatment, not a calendar rotation"), tF("Body condition assessment before winter — add weight now; it is very hard to add in deep cold")],
      [tH("Fall deworming per fecal results — treat for bots after first hard frost kills adult bot flies"), tH("Fall vaccinations if on a biannual schedule — flu, rhino, and others"), tM("Frost ends laminitis season; horses can graze more freely as sugars drop in dying grass")],
      [tM("Blanketing decisions based on body condition, whether horse is clipped, age, and shelter quality"), tF("Introduce hay gradually as grass declines; match hay quality to horse's workload and condition"), tH("Lice check as winter coat grows in — easier to treat before infestation becomes severe")],
      [tM("Mud management is critical around gates and feeders — thrush and mud fever thrive in wet mud"), tH("Thrush inspection: lift each foot, check for black tarry smell and soft frog — treat promptly"), tF("Adjust feed for workload changes — horses in light winter work need less grain, not less hay")],
      [tM("Ice management in buckets and tanks daily — horses will colic before drinking near-frozen water"), tH("Year-end vet exam if not done recently: teeth, body weight, Coggins test if traveling"), tB("Plan spring breeding now if applicable — book a stallion and schedule reproductive exams in December")],
    ]
  },
];

function AnimalCareCalendar() {
  const thisMonth = new Date().getMonth();
  const [selected, setSelected] = useState([]);
  const [month, setMonth] = useState(thisMonth);

  function toggle(id) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  const activeAnimals = ACC_ANIMALS.filter(a => selected.includes(a.id));

  return (
    <div className="acc-shell">

      {/* ── SIDEBAR ── */}
      <div className="acc-sidebar">
        <div className="acc-sidebar-title">Your Animals</div>
        <div className="acc-sidebar-sub">Select all that apply</div>
        <div className="acc-animal-grid">
          {ACC_ANIMALS.map(a => (
            <button
              key={a.id}
              className={`acc-animal-btn${selected.includes(a.id) ? " acc-animal-btn--on" : ""}`}
              style={selected.includes(a.id) ? { borderColor: a.accent, background: a.accent + "22" } : {}}
              onClick={() => toggle(a.id)}
            >
              <span className="acc-animal-emoji">{a.emoji}</span>
              <span className="acc-animal-name">{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="acc-main">
        <div className="acc-month-nav">
          {ACC_MONTH_SHORT.map((lbl, i) => (
            <button
              key={i}
              className={[
                "acc-month-pill",
                month === i    ? "acc-month-pill--active"  : "",
                thisMonth === i && month !== i ? "acc-month-pill--today" : "",
              ].join(" ").trim()}
              onClick={() => setMonth(i)}
            >
              {lbl}
            </button>
          ))}
        </div>

        <div className="acc-month-heading">
          {ACC_MONTH_NAMES[month]}
          {month === thisMonth && <span className="acc-this-month-tag">This Month</span>}
        </div>

        {selected.length === 0 ? (
          <div className="acc-empty">
            <div className="acc-empty-icon">🐾</div>
            <div className="acc-empty-title">Select your animals</div>
            <div className="acc-empty-sub">Choose the species you raise on the left to see monthly care tasks.</div>
          </div>
        ) : (
          <div className="acc-cards">
            {activeAnimals.map(animal => {
              const tasks = animal.months[month] || [];
              return (
                <div key={animal.id} className="acc-card" style={{ borderLeftColor: animal.accent }}>
                  <div className="acc-card-header">
                    <span className="acc-card-emoji">{animal.emoji}</span>
                    <span className="acc-card-name">{animal.name}</span>
                    <span className="acc-card-count">{tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
                  </div>
                  {tasks.map((task, i) => {
                    const tt = ACC_TASK_TYPES[task.type];
                    return (
                      <div key={i} className="acc-task" style={{ background: tt.bg }}>
                        <span className="acc-task-badge" style={{ color: tt.color }}>
                          {tt.icon} {tt.label}
                        </span>
                        <p className="acc-task-text">{task.text}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============= ANIMAL CARE CALENDAR =============

const ACC_TASK_TYPES = {
  health:      { icon: "🩺", label: "Health",      color: "#b5451b", bg: "rgba(181,69,27,0.08)"  },
  feeding:     { icon: "🌾", label: "Feeding",     color: "#7a5c1e", bg: "rgba(200,169,110,0.14)" },
  breeding:    { icon: "💕", label: "Breeding",    color: "#6a3e78", bg: "rgba(122,74,110,0.09)"  },
  maintenance: { icon: "🔧", label: "Maintenance", color: "#3d2b1f", bg: "rgba(92,61,46,0.08)"    },
  seasonal:    { icon: "🌡️", label: "Seasonal",   color: "#1e6a8e", bg: "rgba(46,110,142,0.08)"  },
  grooming:    { icon: "✂️", label: "Grooming",    color: "#3a5e2a", bg: "rgba(74,94,58,0.09)"   },
};
const ACC_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const ACC_SHORT  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const tH = t => ({ type: "health",      text: t });
const tF = t => ({ type: "feeding",     text: t });
const tB = t => ({ type: "breeding",    text: t });
const tM = t => ({ type: "maintenance", text: t });
const tS = t => ({ type: "seasonal",    text: t });
const tG = t => ({ type: "grooming",    text: t });

const ACC_ANIMALS = [
  {
    id: "chickens", name: "Chickens", emoji: "🐓", accent: "#e8b84b",
    months: [
      [tF("Increase feed ~10% — hens burn more calories staying warm in cold"), tM("Check water heaters daily; frozen water stops laying within 24 hours"), tS("Run 14–16 hrs of artificial light to maintain winter egg production")],
      [tH("Inspect combs and wattles for frostbite; apply petroleum jelly as prevention"), tB("Order spring chicks now — hatcheries fill up by March"), tM("Deep-clean and disinfect coop while flock is at its smallest")],
      [tB("Set up brooder before chicks arrive: 95°F week 1, drop 5°F each week after"), tH("First lice and mite check of the year; treat coop at dusk if found"), tF("Switch new chicks to 20–22% protein chick starter feed")],
      [tM("Spring cleaning: replace all bedding, scrub surfaces, inspect hardware cloth for gaps"), tH("Deworm if on a rotation program; check thoroughly for external parasites"), tF("Transition flock to pasture gradually — sudden grass change causes digestive upset")],
      [tH("Check for bumblefoot (swollen, scabbed foot pads) during routine handling"), tF("Peak laying demands peak nutrition — quality layer pellets always available"), tS("Set up shade structures and extra water stations before summer heat arrives")],
      [tS("Provide shade, ventilation, and cold water — heat stress kills layers fast"), tF("Reduce scratch grain in summer; it raises body temperature"), tH("Watch for panting, drooping wings, pale combs — early signs of heat stroke")],
      [tS("Freeze fruit or veggie treats as cooling snacks; refresh water multiple times daily"), tH("Peak parasite pressure — red mites thrive in heat; treat coops at dusk"), tM("Maximize coop ventilation; open all vents and add fans if temps exceed 90°F")],
      [tH("Molt season begins for many hens — reduced laying is normal, not illness"), tF("Add extra protein (mealworms, gamebird feed) to support feather regrowth"), tM("Repair and repaint coop before fall rains arrive")],
      [tB("Evaluate flock: cull non-layers and aging hens before winter feed costs mount"), tM("Weatherize coop — seal drafts, check roof, prep deep litter method"), tF("Reintroduce scratch grains to help hens build fat reserves before cold")],
      [tS("Restart supplemental lighting — 14 hrs/day prevents winter egg drop"), tM("Add deep bedding (6–8 inches) for winter warmth via composting"), tH("Watch for respiratory illness as damp autumn weather sets in")],
      [tF("Warm mash on cold mornings boosts calories and morale"), tH("Annual check for internal parasites before winter — consider a fecal float test"), tM("Switch to heated water base if temps drop below freezing")],
      [tM("Maximize bedding depth; ensure good ventilation — moisture causes more harm than cold"), tF("High-energy treats (sunflower seeds, suet) help hens stay warm overnight"), tS("Plan next year's flock: breeds, replacements, and hatchery orders")],
    ],
  },
  {
    id: "ducks", name: "Ducks", emoji: "🦆", accent: "#7ab8d4",
    months: [
      [tM("Ensure water is unfrozen daily — ducks must dunk their bills to clear sinuses"), tS("Provide wind-blocking shelter; ducks tolerate cold better than chickens"), tF("Increase layer pellets slightly for cold-weather energy needs")],
      [tB("Ducks often begin laying in Feb — provide low nesting boxes; they don't perch"), tH("Check bills and feet for frostbite in extreme cold"), tM("Collect eggs frequently; ducks lay early morning on the ground")],
      [tB("Incubate fertile duck eggs at 99.5°F, 55–65% humidity for 28 days"), tF("Introduce ducklings to shallow water supervised from day 1"), tM("Clean pond or pool; ducks foul water quickly")],
      [tH("First parasite check of season; ducks are generally hardy but monitor for lice"), tM("Spring-clean duck house; rake and compost soiled bedding"), tF("Transition to pasture — ducks are excellent foragers and natural slug hunters")],
      [tB("If hatching a second clutch, set eggs now for summer ducklings"), tS("Install shade over the water area before summer heat"), tF("Supplement niacin via brewer's yeast in feed — ducks need 3× the niacin of chickens")],
      [tS("Ducks handle heat well if they have swimming water; keep pool fresh daily"), tH("Watch for Angel Wing in ducklings — too-high protein causes it; switch to 15–16% feed"), tM("Maintain clean swimming water to prevent bacterial growth")],
      [tS("Keep swimming pool cool and clean — it's their primary heat-management tool"), tF("Fresh greens and garden slugs are a welcome summer treat"), tH("Check for bumblefoot if ducks spend time on hard or rough ground")],
      [tH("Late-summer molt — reduced egg production is normal"), tM("Drain and scrub pond or pool thoroughly; algae peaks in summer heat"), tB("Evaluate breeding stock for next year's hatching season")],
      [tM("Repair and weatherize duck house before fall rains"), tF("Restore full layer ration as molt ends and laying resumes"), tH("Deworm if on a rotation; fecal check recommended in fall")],
      [tF("Increase calories as temps drop; ducks stay active outdoors longer than chickens"), tM("Prepare heated water station; ducks require liquid water year-round"), tB("Evaluate flock size — decide how many to overwinter")],
      [tS("Ducks can forage in light snow; let them choose their outdoor time"), tM("Add extra bedding in shelter for warmth"), tH("Monitor feet in freezing mud — foot rot risk increases in wet-cold conditions")],
      [tM("Daily water management is critical — unfrozen access is non-negotiable"), tF("High-energy feed supplement in extreme cold snaps"), tS("Ducks often play in first snowfalls — enrichment is good for winter mental health")],
    ],
  },
  {
    id: "rabbits", name: "Rabbits", emoji: "🐰", accent: "#c8a96e",
    months: [
      [tM("Check water bottles twice daily — they freeze before bowls do"), tS("Add extra nesting hay; rabbits self-regulate warmth but comfort matters"), tH("Watch for respiratory illness (snuffles) in cold, damp conditions")],
      [tB("Begin breeding for March litters; gestation is 28–31 days"), tM("Prepare nest boxes: fill with hay 3 days before the doe's due date"), tH("Pre-breeding health check — weight, teeth alignment, reproductive health")],
      [tB("First litters born; check kits daily but minimize handling for the first 10 days"), tH("Watch for mastitis in does; check nipples for swelling or heat after kindling"), tM("Keep nest box clean; remove soiled bedding gently without disturbing kits")],
      [tB("Wean kits at 6–8 weeks; separate by sex immediately at 8 weeks to prevent early breeding"), tH("Spring health check: teeth, weight, coat condition for all adults"), tF("Transition does back to a breeding ration after weaning")],
      [tB("Peak breeding season; does can kindle every 35–42 days if well-managed"), tS("Monitor temperatures — rabbits show heat distress above 85°F"), tM("Clean and sanitize hutches as mud season dries up")],
      [tS("HEAT IS CRITICAL — rabbits can die above 104°F internal body temperature"), tM("Place frozen 2-liter bottles in cages for cooling; move hutches fully into shade"), tF("Reduce pellets slightly in heat; increase timothy hay and fresh leafy greens")],
      [tS("Suspend breeding — heat stress causes high kit mortality and doe distress"), tM("Multiple frozen bottles, fans, and misters; check every few hours on hot days"), tH("Ear veins flushed or purple = overheating; cool immediately with damp cloth")],
      [tS("Continue cooling protocols through late summer"), tB("Resume light breeding as evenings cool in late August"), tH("Post-summer health check; weight loss from heat stress is common")],
      [tB("Fall breeding — excellent conception rates as temperatures cool"), tM("Transition hutches back to receive more sun for warmth"), tH("Check for ear mites — dark waxy debris in ear canal is the sign")],
      [tB("Strong fall litters; cool weather makes kit survival much easier"), tM("Prepare winter hutch insulation; block wind while maintaining airflow"), tF("Increase pellet ration slightly as cold weather arrives")],
      [tB("Late breeding — ensure kits are born before deep cold arrives"), tM("Nest boxes in full time; add extra hay depth for insulation"), tH("Check for sore hocks on wire floors; add resting mats if skin is irritated")],
      [tM("Reliable water supply is the #1 winter priority — check bottles every few hours"), tF("Extra pellets and unlimited hay for warmth; rabbits need more calories in cold"), tH("Year-end health check; record breeding performance and plan next year's culls")],
    ],
  },
  {
    id: "goats", name: "Goats", emoji: "🐐", accent: "#9dc183",
    months: [
      [tB("Peak kidding if fall-bred — kids need colostrum within 1 hour of birth"), tF("Increase grain for late-pregnant and lactating does — 1 lb/day per lb of milk produced"), tH("Watch for ketosis (pregnancy toxemia) in heavily pregnant does in the final 2 weeks")],
      [tB("Kidding continues; keep area dry and draft-free — hypothermia kills kids within hours"), tH("CDT booster for does 4 weeks before kidding; kids need CDT at 4 and 8 weeks"), tM("Fresh dry bedding is critical; wet kidding areas spread disease")],
      [tH("Vaccinate kids: CDT at 4 weeks, booster at 8 weeks — both doses required"), tG("Disbud kids at 3–7 days old; scurs grow if delayed beyond 10 days"), tF("Transition herd to spring pasture slowly — rapid grass change causes bloat")],
      [tH("FAMACHA scoring for barber pole worm — check inner eyelid; treat below score 3"), tM("Hoof trimming season — overgrown hooves cause lameness on wet spring ground"), tF("Monitor for grass tetany on lush spring pasture; supplement magnesium if needed")],
      [tH("Parasite pressure peaks — rotate pastures, FAMACHA score weekly"), tF("Peak milk production — support with quality hay, kelp, and loose goat minerals"), tM("Manage brush and weeds — goats excel at clearing invasive plant species")],
      [tG("Shear Angora or Cashmere goats if not done in spring — before fly season peaks"), tH("Watch for pinkeye (conjunctivitis) — spreads rapidly in summer flies"), tS("Provide shade and fresh water; goats are more heat-sensitive than most expect")],
      [tH("Summer FAMACHA checks every 2 weeks; barber pole worm burden peaks in heat and humidity"), tS("Kids born in spring are reaching weaning age; adjust does' rations down"), tM("Trim feet again if hooves have grown fast on wet summer ground")],
      [tB("Bucks come into rut — separate from does unless actively breeding; behavior gets intense"), tF("Flush does before breeding: increase grain 2 weeks before introducing buck"), tH("Pre-breeding health check; treat any parasite issues before conception")],
      [tB("Breeding season — note each doe when bred; gestation is ~150 days"), tH("Annual CDT booster for whole herd if not done in spring"), tM("Prepare hay storage: 30–50 lbs per goat per month is a typical winter need")],
      [tB("Confirm pregnancies via ultrasound at day 35–45 or watch for return heats at day 21"), tF("Adjust rations: early pregnancy = maintenance; final 6 weeks = increase grain"), tM("Hoof trimming before winter — clean hooves resist foot rot better in mud")],
      [tF("Late pregnancy nutrition: increase grain for does in the final 6 weeks"), tH("Watch for urinary calculi in wethers — maintain 2:1 calcium-to-phosphorus ratio"), tM("Prepare kidding area: clean, insulated, brightly lit, and close to your house")],
      [tF("Final pre-kidding nutrition push; selenium/vitamin E injection if in a deficient region"), tH("Gather kidding supplies: iodine, feeding tube, towels, colostrum, heat lamp"), tB("Know your due dates; check late-pregnant does every 4 hours as the date approaches")],
    ],
  },
  {
    id: "pigs", name: "Pigs", emoji: "🐷", accent: "#f4a0a0",
    months: [
      [tM("Deep straw bedding is essential — pigs will burrow for warmth"), tF("Increase feed by 10–15% in cold weather; pigs burn significant calories staying warm"), tH("Check for frostbitten ears; keep shelter draft-free but not completely airtight")],
      [tB("Farrowing prep if sows are bred — heat lamp, creep area, and anti-crush rail in place"), tH("Check piglet birthweights; small pigs need supplemental feeding within hours"), tM("Keep farrowing area 70–75°F for sow, 85–90°F for piglets under lamp")],
      [tB("Wean piglets at 6–8 weeks; separate boar if not actively breeding"), tH("Vaccinate piglets per vet protocol; iron injection at 3 days prevents anemia"), tF("Transition weaners to starter ration; watch for post-weaning scours for 2 weeks")],
      [tM("Move to outdoor paddocks as ground firms; rotate to prevent parasite buildup"), tH("Deworming rotation — spring is a good start-of-year treatment"), tF("Pigs on good pasture can have grain reduced 20–30% if forage quality is high")],
      [tM("Establish wallow (mud pit) before hot weather — pigs cannot sweat"), tH("Check for sunburn on light-skinned breeds; mud is their natural sunscreen"), tF("Peak forage season — supplement pasture with grain to maintain growth rates")],
      [tS("Wallow management is critical — refresh mud regularly; pigs regulate temperature through mud"), tH("Watch for heat stress: rapid shallow breathing, panting, reluctance to move"), tF("Fresh cold water multiple times daily; cold water actively helps them cool down")],
      [tS("Hottest month — pigs are most vulnerable to heat; shade is non-negotiable"), tM("Misters or sprinklers over lounging areas significantly reduce heat stress"), tF("Feed only during the coolest parts of day — early morning and evening")],
      [tF("Market pigs approaching finish weight (~250 lbs live at 5–7 months)"), tB("Plan fall breeding if producing winter or early spring piglets"), tH("Final health check before processing; confirm withdrawal times for any medications")],
      [tB("Fall breeding; gilts should be 7+ months old and 250+ lbs for first breeding"), tM("Plan winter shelter upgrades; pigs need more space if being confined"), tF("Acorn and windfall fruit season — excellent natural supplement, feed freely")],
      [tM("Harvest excess market-weight stock before winter feed costs increase"), tF("Adjust rations as temps cool; gradually increase caloric density"), tH("Pre-winter deworming; treat for mange if skin shows roughness or scratching")],
      [tM("Prepare winter housing; add extra bedding daily as cold sets in"), tF("Winter pigs need 15–20% more total feed than summer"), tH("Watch for respiratory illness as cold damp conditions create disease pressure")],
      [tM("Maintain deep litter pack for warmth — composting bedding generates real heat"), tF("Rich feed and constant bedding keep pigs comfortable and growing"), tS("Check water twice daily — pigs need 1–1.5 gallons per 100 lbs body weight per day")],
    ],
  },
  {
    id: "cattle", name: "Cattle", emoji: "🐄", accent: "#a0785a",
    months: [
      [tB("Calving watch if fall-bred — cold greatly increases risk; be ready for assistance"), tF("Supplement hay with protein tubs or blocks; standing winter grass has little nutrition"), tM("Check water tank heaters daily; cattle need 20–30 gallons per head per day minimum")],
      [tB("Peak calving season for spring-calving herds; keep close night watch"), tH("Scours (calf diarrhea) is the top killer of newborns — treat immediately with electrolytes"), tF("Increase feed for nursing cows; energy demand nearly doubles after calving")],
      [tH("Vaccinate calves for Blackleg, IBR, and BVD at 2–3 months; record everything"), tB("Castrate and ear-tag bull calves before 2 months for easiest recovery"), tF("Careful spring grass transition — frothy bloat risk is high on lush legume pastures")],
      [tM("Begin rotational grazing — rest each paddock 30–60 days between grazings"), tF("Remove winter protein supplements as grass reaches 6–8 inches in height"), tH("Spring pour-on for lice and emerging flies as insect season begins")],
      [tH("Breeding season — bulls in with cows for 60–90 days for spring calving next year"), tM("Check and test all electric fences before full-season pasture rotation begins"), tF("Monitor body condition score — breeding cows should be 5–6 on a 9-point scale")],
      [tH("Fly control critical — pour-ons, back rubbers, or fly tags; prevent pinkeye spread"), tH("Breeding check — watch for repeat heats at 21-day intervals after bull introduction"), tS("Provide shade; heat stress reduces conception rates significantly")],
      [tS("Heat stress peaks — cattle stop eating at midday; feed at dusk and dawn only"), tH("Pinkeye watch — flies spread it rapidly; isolate affected animals immediately"), tM("Rotate pastures on tight schedule to prevent overgrazing in dry conditions")],
      [tB("Wean calves at 6–8 months; target 500–600 lbs as weaning weight"), tH("Pregnancy test cows after bull removal — cull open cows before winter to cut costs"), tF("Body condition score cows — target BCS 5–6; supplement thin animals now")],
      [tH("Fall vaccinations: Blackleg booster, respiratory complex, leptospirosis"), tM("Hay inventory — calculate winter feed needs: 1.5–2% bodyweight in hay per day"), tF("Watch for hardware disease if cleaning fields of old fencing materials")],
      [tM("Pregnancy-check bred heifers; cull or mark open animals"), tF("Transition to hay as grass declines; introduce slowly over 2 weeks"), tH("Lice prevention pour-on in fall — lice thrive in dense winter hair coats")],
      [tF("Full winter hay feeding; 25–30 lbs per cow per day as a baseline"), tM("Check all fencing before snow covers electric wire ground posts"), tH("Body condition check — thin cows in late pregnancy must get extra grain supplement now")],
      [tB("Late-pregnant cows need extra care — calving supplies fully stocked and ready"), tF("High-quality hay is critical in final trimester — fetal development is at its peak"), tM("Clear manure from feeding areas to prevent slip-and-fall injuries on ice")],
    ],
  },
  {
    id: "sheep", name: "Sheep", emoji: "🐑", accent: "#b8d4e8",
    months: [
      [tB("Ewes in late pregnancy — increase energy feed; have lambing supplies ready"), tF("Final 4 weeks: 0.5 lb grain/day per ewe prevents pregnancy toxemia"), tH("Watch for ketosis in heavy ewes — drench with propylene glycol at first sign")],
      [tB("Lambing peak — monitor for malpresentations; have OB sleeves and lube ready"), tH("Newborns need colostrum within 2 hours; hypothermia is the #1 lamb killer"), tM("Dry, clean lambing jugs for every ewe/lamb pair; graft orphan lambs quickly")],
      [tH("CDT vaccination for lambs at 3–4 weeks; booster 4 weeks later — both doses required"), tB("Castrate and ear-tag ram lambs early; band while young for easiest recovery"), tG("Crutch (trim wool around) ewes' udders and tail area for hygiene")],
      [tH("FAMACHA scoring starts — check inner eyelid monthly through fall; treat below score 3"), tM("Hoof trimming — wet spring conditions promote foot rot; check between toes"), tF("Transition to pasture gradually; pulpy kidney on lush spring grass is a real risk")],
      [tG("SHEARING SEASON — shear before flies get active; book your shearer well in advance"), tH("Check for fly strike immediately after shearing; keep breech area short all summer"), tM("Ear tag, record weights, and draft flock after shearing — best time for full inventory")],
      [tH("Blowfly strike prevention — high risk on warm humid days, especially around the breech"), tF("Ewes on good summer pasture can significantly reduce or eliminate grain supplementation"), tM("Pasture rotation every 3–5 days to break the barber pole worm life cycle")],
      [tH("FAMACHA scoring biweekly — barber pole worm peaks in summer heat and humidity"), tS("Provide shade and fresh water — sheep can overheat even after shearing"), tB("Evaluate ewes: cull poor mothers, chronic wormy animals, and low producers now")],
      [tB("Flushing ewes: increase grain 2–3 weeks before ram introduction for higher twin rates"), tH("Pre-breeding dewormer only if FAMACHA warrants — avoid over-treating; resistance risk"), tG("Hoof trimming before rams go in — easier handling when everyone is gathered")],
      [tB("Ram introduction — mark chest with raddle crayon to identify which ewes are bred"), tH("Check ram's breeding soundness: feet, teeth, libido, and body condition before season"), tF("Bred ewes on maintenance ration; early pregnancy has the lowest nutritional demands")],
      [tB("Change raddle color at day 17 to identify ewes who cycled again (not held)"), tH("Annual CDT booster for ewes — give 4 weeks before lambing; calculate due dates now"), tM("Hay stores check — sheep need 4–6 lbs of hay per head per day through winter")],
      [tF("Mid-pregnancy nutrition — good quality hay, but hold off on excess grain; ewes get fat easily"), tH("Foot rot check and trim — lame ewes entering winter lose body condition rapidly"), tM("Prepare lambing jugs (small pens); stock iodine, stomach tubes, towels, and colostrum")],
      [tB("Mark ewes with expected lamb dates based on breeding and raddle records"), tF("Last 6 weeks of pregnancy: grain increases to 0.5–1 lb/day as twin fetal growth peaks"), tH("Selenium or vitamin E deficiency is common — blood test or blanket injection if in a deficient region")],
    ],
  },
  {
    id: "bees", name: "Honeybees", emoji: "🐝", accent: "#e8b84b",
    months: [
      [tM("Do NOT open the hive — breaking the cluster in cold can kill the entire colony"), tM("Heft hive from the back; a noticeably light hive means starvation risk — emergency feed now"), tS("Ensure top ventilation; moisture kills winter clusters faster than cold temperature")],
      [tF("Place candy board or fondant above cluster if hive felt light in January"), tH("Watch for cleansing flights on warm days above 50°F — normal, healthy winter behavior"), tM("Check for mouse entry via front entrance; mice destroy comb and frames quickly")],
      [tH("First full inspection when sustained temps reach above 55°F — check queen, brood, and stores"), tM("Replace any moldy or damaged frames; add a medium super if colony is very strong"), tB("Look for swarm cells on bottom of frames — early splits prevent losing half the hive")],
      [tB("SWARM PREVENTION is the main April job — add space, make splits, or requeen if needed"), tH("First Varroa mite alcohol wash of the year; treat if above 2 mites per 100 bees"), tM("Reverse brood boxes in Langstroth hives to equalize population distribution")],
      [tF("Peak nectar flow — add honey supers promptly; full supers with nowhere to go triggers swarming"), tH("Second Varroa check — treat only if threshold exceeded during active honey flow"), tM("Monitor weekly during peak flow; split or add space as population explodes")],
      [tF("Harvest early honey if supers are fully capped — uncapped honey can ferment in storage"), tH("Post-nectar-flow Varroa treatment window if done collecting honey this year"), tB("Requeen failing or defensive colonies — a new queen improves genetics and mite resistance")],
      [tS("Summer dearth begins — bees may rob weaker hives; reduce all entrances now"), tM("Keep fresh water source nearby; bees need water to cool the hive by evaporation"), tH("Watch for small hive beetles; traps in the corners help in warm climates")],
      [tH("CRITICAL: treat for Varroa mites after honey harvest — mite levels peak in fall bees"), tF("Assess winter stores — bees need 60–80 lbs of capped honey to survive winter safely"), tM("Reduce entrance to mouse-guard size; add robbing screen if dearth-related robbing occurs")],
      [tH("Final mite treatment if alcohol wash shows threshold still elevated after August"), tF("Feed 2:1 sugar syrup to supplement stores if hive still feels light after inspection"), tM("Last full inspection before winter prep; confirm queen is present and laying well")],
      [tM("Insulate hive top; install mouse guards; add entrance reducer to smallest opening"), tF("Stop feeding sugar syrup when temps drop below 50°F — switch to solid candy or fondant"), tH("Final heft to assess winter stores before hard cold sets in")],
      [tM("Minimal disturbance — check externally only; a dead bee pile at the entrance is normal"), tS("Ensure top ventilation; condensation dripping onto the cluster is a common winter killer"), tH("A quiet hive in cold weather is a healthy hive — resist the urge to open it")],
      [tM("Monitor hive weight monthly by hefting; order packages or nucs for spring now — they sell out"), tS("Snow can insulate hives — don't brush it off unless it fully blocks the entrance"), tH("Plan next year: order queens, packages, or nucs; quality suppliers book out by January")],
    ],
  },
  {
    id: "turkeys", name: "Turkeys", emoji: "🦃", accent: "#b5451b",
    months: [
      [tM("Provide wind-blocking shelter with deep bedding; turkeys are hardier than chickens but still need warmth"), tF("High-protein feed (22–24%) maintains feather condition and body weight through winter"), tH("Keep turkeys SEPARATE from chickens year-round — blackhead disease is turkey-specific and often fatal")],
      [tB("Order poults now — heritage breeds especially sell out fast; hatcheries book up by March"), tM("Plan and build brooder before poults arrive: needs 100°F at floor level in week 1"), tH("If keeping a breeding flock, toms begin display behavior now — monitor flock dynamics")],
      [tB("If keeping breeding stock: collect fertile eggs daily for hatching or incubation"), tM("Last reliable month to order from hatcheries for May–June delivery"), tH("Annual health check for breeding birds: weight, feet condition, wattles, and eyes")],
      [tB("Spring poults begin arriving from hatcheries — brooder must be ready and fully warm"), tM("Brooder setup: 95–100°F at floor level, non-slip surface, turkey starter feed only"), tH("Poults are fragile — they drown in deep water, pile and suffocate; check them very frequently")],
      [tB("Poults at 4–6 weeks: begin transitioning to an outdoor pen with full predator protection"), tF("Grower feed: 26–28% protein for broad-breasted; 20–22% for heritage breeds"), tH("Keep strictly separate from chickens — blackhead disease is transmitted through chicken droppings")],
      [tM("Full outdoor range access with predator-proof shelter; turkeys are high-value prey"), tF("Supplement with high-protein treats: mealworms, black soldier fly larvae, insects"), tH("Isolate any bird showing nasal discharge or gurgling sounds — respiratory illness spreads fast")],
      [tS("Provide shade and fresh water — turkeys handle heat less well than chickens"), tF("Broad-breasted market birds on track: reaching 25–30 lbs at 16–20 weeks"), tH("No medications with withdrawal periods for birds headed to harvest within 60 days")],
      [tB("Broad-breasted birds approaching processing weight; schedule your butcher date now — they book up"), tM("Heritage breeds continue growing — toms reach 20–25 lbs around 28 weeks"), tH("Stop all feed 12 hours before processing day for clean processing")],
      [tB("Broad-breasted processing for October pickup orders and early Thanksgiving sales"), tM("Heritage toms at 20–25 lbs by 28+ weeks; hens at 12–16 lbs"), tF("Reduce feed 2 weeks before processing to improve final feed conversion ratio")],
      [tB("Thanksgiving birds due — schedule processing for week of November 20–22 for fresh delivery"), tM("Final harvest of remaining market birds; record weights and feed conversion for next year"), tH("Keep breeding flock healthy through harvest season; they carry next year's genetics")],
      [tB("Breeding toms and hens into winter housing; separate toms to reduce aggression on hens"), tM("Deep-clean all grow-out areas; rotate to fresh ground if possible before next spring"), tH("Check for lice and mites as birds enter close winter housing — treat if found")],
      [tB("Rest breeding flock with minimal disturbance; plan next year's production numbers"), tM("Clean all equipment: brooders, feeders, waterers — store properly for spring"), tF("Reduce breeding flock to maintenance ration through the winter months")],
    ],
  },
  {
    id: "horses", name: "Horses", emoji: "🐴", accent: "#8a6d30",
    months: [
      [tF("Increase hay in cold — horses need 1.5–2% bodyweight in forage daily; more in freezing temps"), tM("Check water source daily; horses will colic before drinking very cold water — heated tank is ideal"), tG("Thick winter coat is a thermometer — only blanket if clipped, old, or body condition is poor")],
      [tH("Dental float check — worn teeth mean poor hay utilization; critical for horses over 15"), tH("Deworming rotation based on fecal egg count — targeted treatment reduces resistance risk"), tM("Body condition score under the winter coat — if ribs are prominent, add grain supplementation now")],
      [tG("Spring shedding starts — daily grooming removes dead coat and lets you check for skin issues"), tF("Spring grass CAUTION: introduce slowly over 2–3 weeks; laminitis risk is very high on lush pasture"), tM("Treat mud fever on lower legs: clean, dry, apply zinc oxide barrier cream")],
      [tH("Spring vaccinations: Eastern/Western EEE, West Nile, Flu/Rhino, Tetanus, Rabies"), tM("Farrier appointment — winter hooves are often long and out of balance; trim or shoe now"), tF("Pregnant mares on fescue pasture: move to non-endophyte fescue 60–90 days before foaling")],
      [tH("Second deworming rotation per fecal egg count results from spring test"), tM("Pasture rotation begins; rest paddocks 30 days between grazing to reduce parasite load"), tS("Fly protection starts: masks, sheets, leg wraps, permethrin spray applied weekly")],
      [tS("Fly sheet and mask daily if horse shows irritation from insect pressure"), tF("Electrolytes in water or top-dressed on feed during heat waves to encourage drinking"), tH("Watch for summer sores (Habronema larvae) around wounds and eyes — fly-season wound management")],
      [tS("Peak heat: ride only in early morning or evening; watch for sweating insufficiency (anhidrosis)"), tF("Minimum 5 gallons of fresh water per day in heat; more for horses in work"), tH("Bot fly eggs appear as yellow dots on legs — remove weekly with a bot knife to break the life cycle")],
      [tG("Bot egg removal from legs, chest, and jaw — use fine-toothed comb or warm wet cloth"), tH("Fecal egg count before fall deworming decision — use targeted selective treatment only"), tF("Body condition assessment before winter supplement decisions — don't wait until it's obvious")],
      [tH("Fall deworming per fecal results — treat for bots in late fall after first killing frost"), tH("Fall vaccinations if on a biannual schedule — schedule vet visit now before fall rush"), tM("Frost kills spring laminitis risk; horses can graze more freely once grass stops growing")],
      [tM("Blanketing decisions based on body condition, clip status, age, and shelter quality"), tF("Introduce hay as grass declines; match hay quality to horse's condition and workload"), tH("Lice check as winter coat grows — easier and cheaper to treat before infestation is severe")],
      [tM("Mud management around gates, feeders, and water — thrush and mud fever spike in wet-cold"), tH("Thrush check weekly: lift feet, smell — black tarry residue requires treatment"), tF("Adjust grain for reduced workload — horses in light winter work need significantly less grain")],
      [tM("Ice management at water source — horses will not drink near-frozen water; impaction colic risk"), tH("Year-end vet check: teeth, body condition, Coggins test if traveling"), tB("Plan spring breeding if applicable: schedule ultrasound and book stallion by December or January")],
    ],
  },
];

function AnimalCareCalendar() {
  const today = new Date();
  const [selected, setSelected] = useState([]);
  const [month, setMonth] = useState(today.getMonth());
  const thisMonth = today.getMonth();

  function toggle(id) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  const activeAnimals = ACC_ANIMALS.filter(a => selected.includes(a.id));

  return (
    <div className="acc-shell">
      <div className="acc-sidebar">
        <div className="acc-sidebar-title">Your Animals</div>
        <div className="acc-sidebar-sub">Select all that apply</div>
        <div className="acc-animal-grid">
          {ACC_ANIMALS.map(a => (
            <button
              key={a.id}
              className={`acc-animal-btn${selected.includes(a.id) ? " acc-animal-btn--on" : ""}`}
              style={selected.includes(a.id) ? { borderColor: a.accent, background: a.accent + "28" } : {}}
              onClick={() => toggle(a.id)}
            >
              <span className="acc-animal-emoji">{a.emoji}</span>
              <span className="acc-animal-name">{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="acc-main">
        <div className="acc-month-nav">
          {ACC_SHORT.map((lbl, i) => (
            <button
              key={i}
              className={`acc-month-pill${month === i ? " acc-month-pill--active" : ""}${thisMonth === i && month !== i ? " acc-month-pill--today" : ""}`}
              onClick={() => setMonth(i)}
            >
              {lbl}
            </button>
          ))}
        </div>

        <div className="acc-month-heading">
          {ACC_MONTHS[month]}
          {thisMonth === month && <span className="acc-this-month-tag">This month</span>}
        </div>

        {selected.length === 0 ? (
          <div className="acc-empty">
            <div className="acc-empty-icon">🐾</div>
            <div className="acc-empty-title">Select your animals</div>
            <div className="acc-empty-sub">Choose the species you raise on the left to see their monthly care tasks.</div>
          </div>
        ) : (
          <div className="acc-cards">
            {activeAnimals.map(animal => {
              const tasks = animal.months[month] || [];
              return (
                <div key={animal.id} className="acc-card" style={{ borderLeftColor: animal.accent }}>
                  <div className="acc-card-header">
                    <span className="acc-card-emoji">{animal.emoji}</span>
                    <span className="acc-card-name">{animal.name}</span>
                    <span className="acc-card-count">{tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
                  </div>
                  {tasks.map((task, i) => {
                    const tt = ACC_TASK_TYPES[task.type];
                    return (
                      <div key={i} className="acc-task" style={{ background: tt.bg }}>
                        <span className="acc-task-badge" style={{ color: tt.color }}>
                          {tt.icon} {tt.label}
                        </span>
                        <p className="acc-task-text">{task.text}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============= TOOLS REGISTRY =============

const TOOLS = [
  { id: "planner",          icon: "🌱", category: "Planning",   name: "Homestead Planner",        desc: "Generate a custom plan for your land — animals, vegetables, costs, and more.",                      status: "live" },
  { id: "preservation",     icon: "🫙", category: "Planning",   name: "Food Preservation Planner", desc: "Build a canning, freezing, and fermenting schedule around your harvest.",                           status: "soon" },
  { id: "animal-calendar",  icon: "📅", category: "Planning",   name: "Animal Care Calendar",      desc: "Monthly tasks and reminders tailored to each species on your property.",                           status: "live" },
  { id: "bed-designer",     icon: "🗺️", category: "Planning",   name: "Garden Bed Designer",       desc: "Visually design and lay out your garden beds with drag-and-drop.",                                 status: "soon" },
  { id: "crop-rotation",    icon: "🔄", category: "Planning",   name: "Crop Rotation Planner",     desc: "Plan year-by-year bed rotation to maintain soil health and reduce pests.",                         status: "soon" },
  { id: "break-even",       icon: "📊", category: "Financial",  name: "Break-Even Calculator",     desc: "Find out when your homestead investment starts paying for itself.",                                 status: "live" },
  { id: "budget",           icon: "💰", category: "Financial",  name: "Budget Tracker",            desc: "Track income vs. expenses across your whole homestead operation.",                                  status: "soon" },
  { id: "pricing",          icon: "🏷️", category: "Financial",  name: "Produce Pricing",           desc: "Calculate what to charge at the farmers market to cover costs and profit.",                        status: "soon" },
];

// ============= HOMEPAGE =============

function ToolCard({ tool, onSelect }) {
  return (
    <div
      className={`tool-card${tool.status === "soon" ? " tool-card--soon" : ""}`}
      onClick={() => tool.status === "live" && onSelect(tool.id)}
      role={tool.status === "live" ? "button" : undefined}
    >
      <span className={`tool-card-badge tool-card-badge--${tool.status === "live" ? "live" : "soon"}`}>
        {tool.status === "live" ? "Live" : "Coming Soon"}
      </span>
      <span className="tool-card-icon">{tool.icon}</span>
      <div className="tool-card-category">{tool.category}</div>
      <div className="tool-card-name">{tool.name}</div>
      <div className="tool-card-desc">{tool.desc}</div>
    </div>
  );
}

function HomePage({ onSelect }) {
  const planningTools  = TOOLS.filter(t => t.category === "Planning");
  const financialTools = TOOLS.filter(t => t.category === "Financial");

  return (
    <>
      <div className="home-hero">
        <div className="home-hero-badge">Homestead Toolkit</div>
        <h1>Tools for the<br/><em>Modern Homesteader</em></h1>
        <p>Everything you need to plan, grow, and sustain your homestead — from land planning to financial decisions.</p>
      </div>
      <div className="tools-section">
        <div className="tools-section-title">Planning Tools</div>
        <div className="tools-section-sub">Design, schedule, and manage your land and animals</div>
        <div className="tools-grid">
          {planningTools.map(tool => <ToolCard key={tool.id} tool={tool} onSelect={onSelect} />)}
        </div>

        <div className="tools-section-title">Financial Tools</div>
        <div className="tools-section-sub">Budget, price, and track your homestead finances</div>
        <div className="tools-grid">
          {financialTools.map(tool => <ToolCard key={tool.id} tool={tool} onSelect={onSelect} />)}
        </div>
      </div>
      <div className="home-footer">
        🌿 Homestead Toolkit · Built for people who grow their own
      </div>
    </>
  );
}

// ============= APP SHELL (ROUTER) =============

function AppShell() {
  const [view, setView] = useState("home");
  const currentTool = TOOLS.find(t => t.id === view);

  if (view !== "home") {
    return (
      <>
        <div className="tool-nav">
          <button className="tool-nav-back" onClick={() => setView("home")}>← All Tools</button>
          <span className="tool-nav-label">{currentTool?.icon} {currentTool?.name}</span>
        </div>
        {view === "planner"         && <HomesteadPlanner />}
        {view === "break-even"      && <BreakEvenCalculator />}
        {view === "animal-calendar" && <AnimalCareCalendar />}
      </>
    );
  }

  return <HomePage onSelect={setView} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppShell />);