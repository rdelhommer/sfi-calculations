import { BacteriaResult, ActinobacteriaResult, FungiResult, FbResult, GoodProtozoaResult, NematodeResult, OomyceteResult, CiliateResult, RootNematodeResult } from "./enums";

let bacteriaResultDisplay = {}
bacteriaResultDisplay[BacteriaResult.None] = 'None detected: The bacterial biomass did not meet the minimum recommended range for your types of plants. Need to replenish.'
bacteriaResultDisplay[BacteriaResult.Low] = 'Low: The bacterial biomass did not meet the minimum recommended range for your types of plants. Need to replenish.'
bacteriaResultDisplay[BacteriaResult.Okay] = 'Okay: The results were within range but very high compared to beneficial fungi biomass. Reducing bacteria is recommended.'
bacteriaResultDisplay[BacteriaResult.Good] = 'Good. The bacterial biomass was within range for your types of plants.'
bacteriaResultDisplay[BacteriaResult.High] = 'High: The bacterial biomass is above the recommended range. Needs to be reduced.'

let actinobacteriaResultDisplay = {}
actinobacteriaResultDisplay[ActinobacteriaResult.None] = 'None detected: A certain amount of actinobacteria is needed for your types of plants.'
actinobacteriaResultDisplay[ActinobacteriaResult.Low] = 'Low: The actinobacteria is lower than what is normally found in healthy soils with similar plants.'
actinobacteriaResultDisplay[ActinobacteriaResult.Good] =  'Good: The actinobacteria is within range for healthy soils with your types of plants.'
actinobacteriaResultDisplay[ActinobacteriaResult.High] = 'High: A too high of biomass of actinobacteria will inhibit mycorrhizae colonization; which your types of plants need.'

let fungiResultDisplay = {}
fungiResultDisplay[FungiResult.None] = 'None detected: The beneficial fungal biomass does not meet the minimum of the recommended range. Need to replenish and enhance diversity.'
fungiResultDisplay[FungiResult.Low] = 'Low: The beneficial fungal biomass does not meet the minimum of the recommended range. Need to replenish and enhance diversity.'
fungiResultDisplay[FungiResult.GoodBut] = 'Good, but the results were highly variable and cannot be considered that different than zero. It is recommended to replenish diversity.'
fungiResultDisplay[FungiResult.Good] = 'Good: The fungal biomass observed met the minimum of the recommended range for your types of plants. Great!'

let fbResultDisplay = {}
fbResultDisplay[FbResult.LowBacteria] = 'Low: The bacterial biomass needs to be replenished so the F:B ratio will be closer to the desired range for your type of plants.'
fbResultDisplay[FbResult.HighBacteria] = 'High: The bacterial biomass needs to be reduced so that the F:B ratio will be closer to the desired range for your type of plants.'
fbResultDisplay[FbResult.LowBacteriaLowFungi] = 'Low: The bacterial and beneficial fungal biomass needs to be replenished in order to bring up the F:B ratio to the desired range for your types of plants.'
fbResultDisplay[FbResult.LowFungi] = 'Low: The beneficial fungal biomass needs to be replenished so the F:B ratio will be closer to the desired range.'
fbResultDisplay[FbResult.LowFungiHighBacteria] = 'Low: The bacterial biomass needs to be reduced and the fungal biomass needs to be replenished. Once this is achieved, then the F:B ratio will be closer to the desired range for your types of plants.'
fbResultDisplay[FbResult.Minimum] = 'Great: The F:B ratio met the recommended range for your types of plants. The Soil Foodweb is thriving in your sample material!'

let goodProtozoaResultDisplay = {}
goodProtozoaResultDisplay[GoodProtozoaResult.None] = 'None detected: Bacteria is the main source of food for protozoa. Protozoa help to keep the bacterial biomass within in range and to release nutrients into plant available forms by consuming the bacteria. Need to replenish.'
goodProtozoaResultDisplay[GoodProtozoaResult.Low] = 'Low: Bacteria is the main source of food for protozoa. Protozoa help to keep the bacterial biomass within in range and to release nutrients into plant available forms by consuming the bacteria. Need to replenish.'
goodProtozoaResultDisplay[GoodProtozoaResult.GoodBut] = 'Good, but the results were highly variable and cannot be considered that different than zero. It is recommended to replenish.'
goodProtozoaResultDisplay[GoodProtozoaResult.Good] = 'Good: The beneficial protozoa numbers observed met the minimum requirements for your types of plants.'

let bacteriaNematodeResultDisplay = {}
bacteriaNematodeResultDisplay[NematodeResult.None] = 'None detected: Bacteria-feeding nematodes help keep bacteria populations in balance and with nutrient cycling. Need to replenish.'
bacteriaNematodeResultDisplay[NematodeResult.Low] = 'Low: Bacteria-feeding nematodes help keep bacteria populations in balance and with nutrient cycling. Need to replenish.'
bacteriaNematodeResultDisplay[NematodeResult.Good] = 'Good: Minimum numbers met.'

let fungalNematodeResultDisplay = {}
fungalNematodeResultDisplay[NematodeResult.None] = 'None detected: Fungal-feeding nematodes help to release nutrients from fungal hyphae to the plants. Need to replenish.'
fungalNematodeResultDisplay[NematodeResult.Low] = 'Low: Fungal-feeding nematodes help to release nutrients from fungal hyphae to the plants. Need to replenish.'
fungalNematodeResultDisplay[NematodeResult.Good] = 'Good: Minimum numbers met.'

let predatoryNematodeResultDisplay = {}
predatoryNematodeResultDisplay[NematodeResult.None] = 'None detected: Need to replenish.'
predatoryNematodeResultDisplay[NematodeResult.Low] = 'Low: Need to replenish.'
predatoryNematodeResultDisplay[NematodeResult.Good] = 'Good: Minimum numbers met.'

let oomyceteResultDisplay = {}
oomyceteResultDisplay[OomyceteResult.None] = 'None detected. No disease-causing fungi were observed in the sample. Great!'
oomyceteResultDisplay[OomyceteResult.Present] = 'Some oomycetes were detected but the beneficial fungal biomass was adequate to out compete the disease causing fungi.'
oomyceteResultDisplay[OomyceteResult.High] = 'High: Needs to be eliminated. These types of fungi are often disease-causing.'

let ciliateResultDisplay = {}
ciliateResultDisplay[CiliateResult.None] = 'None detected: No ciliates were observed in the sample. Great!'
ciliateResultDisplay[CiliateResult.Present] = 'A few ciliates indicate that this material is becoming anaerobic. A healthy Soil Foodweb needs aerobic conditions.'
ciliateResultDisplay[CiliateResult.High] = 'High: Needs to be eliminated. Ciliates are an indication of anaerobic conditions.'

let rootNematodeResultDisplay = {}
rootNematodeResultDisplay[RootNematodeResult.None] = 'None detected. No root-feeding nematodes were detected. Great!'
rootNematodeResultDisplay[RootNematodeResult.High] = 'High: These types of nematodes will attack your roots and kill your plants. Needs to be eliminated.'

export { 
  bacteriaResultDisplay, 
  actinobacteriaResultDisplay,
  fungiResultDisplay, 
  fbResultDisplay, 
  goodProtozoaResultDisplay,
  bacteriaNematodeResultDisplay,
  fungalNematodeResultDisplay,
  predatoryNematodeResultDisplay,
  oomyceteResultDisplay,
  ciliateResultDisplay,
  rootNematodeResultDisplay
}