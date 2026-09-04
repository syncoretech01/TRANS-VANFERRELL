import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const services = [
  {
    code: "01",
    title: "Full truckload",
    short: "FTL",
    description:
      "Dedicated trailer capacity coordinated around your lane, schedule, and load requirements.",
    tags: ["Dry van", "Reefer", "Flatbed"],
    spec: "DEDICATED CAPACITY",
    diagram: "ftl",
    visualKicker: "Dedicated corridor",
    visualTitle: "One load. One trailer.",
    visualLabel:
      "Full truckload diagram showing one dedicated trailer moving directly from shipper to receiver.",
  },
  {
    code: "02",
    title: "Partial & LTL",
    short: "LTL",
    description:
      "Right-sized freight coordination when your shipment does not require a full trailer.",
    tags: ["Partial", "Palletized", "Flexible"],
    spec: "RIGHT-SIZED MOVES",
    diagram: "ltl",
    visualKicker: "Consolidation logic",
    visualTitle: "Right-sized space.",
    visualLabel:
      "Partial and LTL diagram showing several palletized shipments consolidated into shared trailer capacity.",
  },
  {
    code: "03",
    title: "Expedited freight",
    short: "EXP",
    description:
      "Responsive capacity options for shipments moving against tighter pickup or delivery windows.",
    tags: ["Time critical", "Direct", "Responsive"],
    spec: "PRIORITY ROUTING",
    diagram: "expedited",
    visualKicker: "Priority routing",
    visualTitle: "Direct to the window.",
    visualLabel:
      "Expedited freight diagram showing a direct priority route from pickup readiness to the delivery window.",
  },
  {
    code: "04",
    title: "Recurring & multi-stop",
    short: "RPT",
    description:
      "Organized support for repeat lanes, multiple appointments, and more involved shipment plans.",
    tags: ["Repeat lanes", "Multi-stop", "Scheduled"],
    spec: "ROUTE CONTINUITY",
    diagram: "recurring",
    visualKicker: "Route continuity",
    visualTitle: "Stops kept in sequence.",
    visualLabel:
      "Recurring and multi-stop diagram showing an ordered route through several stops and back into a repeat cycle.",
  },
];

const processSteps = [
  {
    code: "01",
    title: "Share the load",
    copy: "Send the lane, freight details, timing, and delivery requirements.",
  },
  {
    code: "02",
    title: "Build the move",
    copy: "We coordinate suitable carrier capacity and align the plan before pickup.",
  },
  {
    code: "03",
    title: "Stay connected",
    copy: "We follow the shipment and communicate useful updates through delivery.",
  },
  {
    code: "04",
    title: "Close the loop",
    copy: "Delivery details and documentation are brought together at closeout.",
  },
];

const tickerItems = [
  "FULL TRUCKLOAD",
  "LESS-THAN-TRUCKLOAD",
  "EXPEDITED",
  "MULTI-STOP",
  "RECURRING LANES",
  "EQUIPMENT MATCHING",
];

function Arrow({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow-icon${diagonal ? " arrow-icon--diagonal" : ""}`}
      viewBox="0 0 24 24"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function Logo({ compact = false, onClick }) {
  return (
    <a className={`brand${compact ? " brand--compact" : ""}`} href="#top" aria-label="London Trucking home" onClick={onClick}>
      <svg className="brand-mark" viewBox="0 0 64 52" role="img" aria-hidden="true">
        <path className="brand-mark__bar" d="M7 10h50" />
        <path className="brand-mark__lane" d="M15 11 32 43 49 11" />
        <path className="brand-mark__signal" d="M32 43 49 11h9" />
      </svg>
      <span className="brand-type">
        <span className="brand-name">
          <span>London</span> Trucking
        </span>
        {!compact && <span className="brand-descriptor">General Freight Brokerage</span>}
      </span>
    </a>
  );
}

function HeroRoute() {
  return (
    <div
      className="route-shell"
      role="img"
      aria-label="Freight route diagram showing a load moving from origin through capacity matching to delivery."
    >
      <div className="route-shell__topline">
        <span>ROUTE DESK / LDN-01</span>
        <span className="live-label"><i /> COORDINATING</span>
      </div>

      <div className="route-stage">
        <svg className="route-map" viewBox="0 0 660 530" aria-hidden="true">
          <defs>
            <pattern id="route-grid" width="46" height="46" patternUnits="userSpaceOnUse">
              <path d="M46 0H0V46" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="660" height="530" fill="url(#route-grid)" className="route-grid" />
          <path className="route-ghost" d="M35 425C135 340 125 110 292 164S429 432 623 112" />
          <path id="hero-route" className="route-main" pathLength="1" d="M35 425C135 340 125 110 292 164S429 432 623 112" />
          <path className="route-branch" d="M292 164C380 102 453 89 606 52" />

          <g className="route-node route-node--origin" transform="translate(35 425)">
            <circle r="15" />
            <circle r="4" />
          </g>
          <g className="route-node route-node--broker" transform="translate(292 164)">
            <circle r="22" />
            <circle r="6" />
          </g>
          <g className="route-node route-node--destination" transform="translate(623 112)">
            <circle r="15" />
            <circle r="4" />
          </g>
          <g className="load-marker">
            <rect x="-18" y="-10" width="36" height="20" rx="2" />
            <path d="M-10 0H9M4-5l5 5-5 5" />
          </g>

          <g className="map-caption" transform="translate(18 478)">
            <text>ORIGIN</text>
            <text y="20" className="map-caption__value">LOAD READY</text>
          </g>
          <g className="map-caption" transform="translate(312 131)">
            <text>BROKER NODE</text>
            <text y="20" className="map-caption__value">CAPACITY MATCH</text>
          </g>
          <g className="map-caption map-caption--end" transform="translate(638 147)">
            <text>DESTINATION</text>
            <text y="20" className="map-caption__value">DELIVERY WINDOW</text>
          </g>
        </svg>

        <div className="route-ticket route-ticket--a">
          <span>01 / LOAD</span>
          <strong>DETAILS IN</strong>
        </div>
        <div className="route-ticket route-ticket--b">
          <span>02 / MATCH</span>
          <strong>PLAN ALIGNED</strong>
        </div>
        <div className="route-coordinate">36.7783° N&nbsp;&nbsp; / &nbsp;&nbsp;96.0000° W</div>
      </div>

      <div className="route-shell__footer">
        <span>BROKERED CAPACITY</span>
        <span>HUMAN COORDINATION</span>
        <span>FROM QUOTE TO CLOSEOUT</span>
      </div>
    </div>
  );
}

function FullTruckloadDiagram() {
  return (
    <svg className="service-schematic service-schematic--ftl" viewBox="0 0 620 330" aria-hidden="true">
      <path className="schematic-track" d="M44 246H576" />
      <path className="schematic-track schematic-track--active" pathLength="1" d="M44 246H576" />

      <g className="schematic-pop schematic-warehouse">
        <path className="schematic-panel" d="M34 214v-68l48-31 48 31v68Z" />
        <path className="schematic-line" d="M51 214v-46h62v46M64 168v46M100 168v46" />
      </g>

      <g className="schematic-pop schematic-trailer">
        <rect className="schematic-panel" x="174" y="104" width="242" height="108" rx="3" />
        <rect className="schematic-panel schematic-panel--signal" x="191" y="121" width="208" height="74" rx="2" />
        <path className="schematic-ink" d="M216 121v74M241 121v74M266 121v74M291 121v74M316 121v74M341 121v74M366 121v74" />
        <path className="schematic-panel" d="M416 145h52l31 31v36h-83Z" />
        <path className="schematic-line" d="M445 154v29h42M416 197h83" />
        <circle className="schematic-wheel" cx="213" cy="218" r="11" />
        <circle className="schematic-wheel" cx="382" cy="218" r="11" />
        <circle className="schematic-wheel" cx="469" cy="218" r="11" />
        <text className="schematic-label schematic-label--dark" x="295" y="164" textAnchor="middle">DEDICATED TRAILER</text>
      </g>

      <g className="schematic-pop schematic-receiver">
        <rect className="schematic-panel" x="526" y="135" width="62" height="79" />
        <path className="schematic-line" d="M539 214v-50h36v50M539 176h36M539 189h36M539 202h36" />
      </g>

      <g className="schematic-pop schematic-node-group" transform="translate(44 246)">
        <circle className="schematic-point" r="8" />
        <circle className="schematic-point__core" r="3" />
      </g>
      <g className="schematic-pop schematic-node-group" transform="translate(576 246)">
        <circle className="schematic-point" r="8" />
        <circle className="schematic-point__core" r="3" />
      </g>

      <text className="schematic-label" x="34" y="286">SHIPPER</text>
      <text className="schematic-label schematic-label--value" x="310" y="286" textAnchor="middle">ONE UNINTERRUPTED CORRIDOR</text>
      <text className="schematic-label" x="588" y="286" textAnchor="end">RECEIVER</text>
    </svg>
  );
}

function LessThanTruckloadDiagram() {
  return (
    <svg className="service-schematic service-schematic--ltl" viewBox="0 0 620 330" aria-hidden="true">
      <path className="schematic-track schematic-track--branch" d="M86 82C154 82 174 154 235 154" />
      <path className="schematic-track schematic-track--branch" d="M86 154H235" />
      <path className="schematic-track schematic-track--branch" d="M86 226C154 226 174 154 235 154" />
      <path className="schematic-track" d="M305 154H574" />
      <path className="schematic-track schematic-track--active" pathLength="1" d="M86 154H235" />
      <path className="schematic-track schematic-track--active" pathLength="1" d="M305 154H574" />

      {[64, 136, 208].map((y, index) => (
        <g className="schematic-pop schematic-pallet" key={y}>
          <rect className={`schematic-panel${index === 1 ? " schematic-panel--signal" : ""}`} x="38" y={y} width="48" height="36" />
          <path className={index === 1 ? "schematic-ink" : "schematic-line"} d={`M46 ${y + 12}h32M46 ${y + 24}h32M50 ${y + 36}v7M74 ${y + 36}v7`} />
        </g>
      ))}

      <g className="schematic-pop schematic-hub">
        <rect className="schematic-panel schematic-panel--signal" x="235" y="107" width="70" height="94" rx="3" />
        <path className="schematic-ink" d="M252 127h36v54h-36ZM252 145h36M270 127v54" />
        <text className="schematic-label schematic-label--value" x="270" y="224" textAnchor="middle">HUB</text>
      </g>

      <g className="schematic-pop schematic-shared-trailer">
        <rect className="schematic-panel" x="365" y="112" width="142" height="84" rx="3" />
        <rect className="schematic-panel schematic-panel--soft" x="378" y="126" width="34" height="56" />
        <rect className="schematic-panel schematic-panel--signal" x="418" y="126" width="34" height="56" />
        <rect className="schematic-panel schematic-panel--soft" x="458" y="126" width="34" height="56" />
        <text className="schematic-label schematic-label--value" x="436" y="218" textAnchor="middle">SHARED TRAILER SPACE</text>
      </g>

      <g className="schematic-pop schematic-node-group" transform="translate(574 154)">
        <circle className="schematic-point schematic-point--large" r="11" />
        <circle className="schematic-point__core schematic-point__core--dark" r="3" />
      </g>

      <text className="schematic-label" x="38" y="274">PALLETIZED LOADS</text>
      <text className="schematic-label schematic-label--value" x="310" y="292" textAnchor="middle">CONSOLIDATE → SHARE → DELIVER</text>
      <text className="schematic-label" x="584" y="184" textAnchor="end">OUTBOUND</text>
    </svg>
  );
}

function ExpeditedDiagram() {
  return (
    <svg className="service-schematic service-schematic--expedited" viewBox="0 0 620 330" aria-hidden="true">
      <path className="schematic-track" d="M52 238C195 238 290 194 398 126S520 84 570 84" />
      <path className="schematic-track schematic-track--active" pathLength="1" d="M52 238C195 238 290 194 398 126S520 84 570 84" />

      <g className="schematic-pop schematic-ready-node">
        <circle className="schematic-panel" cx="52" cy="238" r="32" />
        <path className="schematic-line schematic-line--signal" d="M52 220v18l13 8M52 198v8M52 270v8M12 238h8M84 238h8" />
        <circle className="schematic-point schematic-point--large" cx="52" cy="238" r="9" />
      </g>

      <g className="schematic-speed-lines">
        <path className="schematic-line" d="M126 213h62M151 193h74M185 173h78" />
      </g>

      <g className="schematic-pop schematic-priority-marker">
        <path className="schematic-panel schematic-panel--signal" d="M330 126h92l22 22-22 22h-92l-22-22Z" />
        <path className="schematic-ink" d="M347 148h48M387 140l9 8-9 8" />
        <text className="schematic-label schematic-label--value" x="376" y="198" textAnchor="middle">DIRECT MOVE</text>
      </g>

      <g className="schematic-pop schematic-deadline-gate">
        <rect className="schematic-panel schematic-panel--soft" x="542" y="46" width="52" height="212" />
        <path className="schematic-line schematic-line--signal" d="M552 46v212M584 46v212M542 84h52" />
        <circle className="schematic-point schematic-point--large" cx="570" cy="84" r="11" />
      </g>

      <text className="schematic-label" x="20" y="300">PICKUP READY</text>
      <text className="schematic-label schematic-label--value" x="310" y="300" textAnchor="middle">PRIORITY ROUTE / FEWER HANDOFFS</text>
      <text className="schematic-label" x="600" y="284" textAnchor="end">DELIVERY WINDOW</text>
    </svg>
  );
}

function RecurringDiagram() {
  const stops = [
    { x: 54, y: 228, label: "IN" },
    { x: 174, y: 102, label: "01" },
    { x: 314, y: 228, label: "02" },
    { x: 454, y: 102, label: "03" },
    { x: 568, y: 102, label: "OUT" },
  ];

  return (
    <svg className="service-schematic service-schematic--recurring" viewBox="0 0 620 330" aria-hidden="true">
      <path className="schematic-track" d="M54 228H174V102H314V228H454V102H568" />
      <path className="schematic-track schematic-track--active" pathLength="1" d="M54 228H174V102H314V228H454V102H568" />
      <path className="schematic-loop" d="M568 102C610 102 606 278 494 278H142C77 278 54 262 54 228" />
      <path className="schematic-loop schematic-track--active" pathLength="1" d="M568 102C610 102 606 278 494 278H142C77 278 54 262 54 228" />

      {stops.map((stop, index) => (
        <g className="schematic-pop schematic-stop" transform={`translate(${stop.x} ${stop.y})`} key={stop.label}>
          <rect className={`schematic-panel${index > 0 && index < stops.length - 1 ? " schematic-panel--signal" : ""}`} x="-20" y="-20" width="40" height="40" rx="2" />
          <text className={`schematic-stop__number${index > 0 && index < stops.length - 1 ? " schematic-stop__number--dark" : ""}`} y="5" textAnchor="middle">{stop.label}</text>
        </g>
      ))}

      <g className="schematic-pop schematic-cycle-mark" transform="translate(500 278)">
        <path className="schematic-line schematic-line--signal" d="M-4 -11h16V5M12 -11L-3 4" />
      </g>

      <text className="schematic-label" x="34" y="270">PICKUP</text>
      <text className="schematic-label schematic-label--value" x="314" y="64" textAnchor="middle">ORDERED STOPS / ONE ROUTE PLAN</text>
      <text className="schematic-label" x="584" y="64" textAnchor="end">CLOSEOUT</text>
      <text className="schematic-label" x="584" y="310" textAnchor="end">REPEAT CYCLE</text>
    </svg>
  );
}

const diagramComponents = {
  ftl: FullTruckloadDiagram,
  ltl: LessThanTruckloadDiagram,
  expedited: ExpeditedDiagram,
  recurring: RecurringDiagram,
};

function ServiceDiagram({ service }) {
  const Diagram = diagramComponents[service.diagram] || FullTruckloadDiagram;

  return (
    <div
      className={`service-board__visual service-board__visual--${service.diagram}`}
      key={service.code}
      role="img"
      aria-label={service.visualLabel}
    >
      <div className="service-board__watermark" aria-hidden="true">{service.short}</div>
      <div className="service-board__diagram-label" aria-hidden="true">
        <span>{service.visualKicker}</span>
        <strong>{service.visualTitle}</strong>
      </div>
      <Diagram />
      <div className="service-board__spec" aria-hidden="true">
        <span>MODE / {service.short}</span>
        <span>{service.spec}</span>
      </div>
    </div>
  );
}

const ESTIMATOR_LIMITS = {
  miles: {
    min: 50,
    max: 2800,
    step: 10,
    initial: 780,
    ticks: ["50", "750", "1,450", "2,150", "2,800"],
  },
  weight: {
    min: 1000,
    max: 45000,
    step: 500,
    initial: 22000,
    ticks: ["1K", "12K", "23K", "34K", "45K"],
  },
};

const ESTIMATOR_EQUIPMENT = [
  { id: "van", code: "VAN", label: "Dry van", rate: 1, payload: 45000, fuel: 0.42, transit: 1 },
  { id: "reefer", code: "RFR", label: "Reefer", rate: 1.18, payload: 43500, fuel: 0.51, transit: 1.05 },
  { id: "flatbed", code: "FLT", label: "Flatbed", rate: 1.12, payload: 48000, fuel: 0.42, transit: 1.08 },
];

const ESTIMATOR_SERVICE = [
  { id: "standard", code: "STD", label: "Standard", rate: 1, milesPerDay: 500, pad: 2, pickup: "24-48 HR", spread: 0.08 },
  { id: "priority", code: "PRI", label: "Priority", rate: 1.16, milesPerDay: 580, pad: 1, pickup: "12-24 HR", spread: 0.09 },
  { id: "expedited", code: "EXP", label: "Expedited", rate: 1.42, milesPerDay: 700, pad: 0, pickup: "2-8 HR", spread: 0.12 },
];

const ESTIMATOR_ACCESSORIALS = [
  { id: "liftgate", code: "LFT", label: "Liftgate", detail: "Power gate at pickup or delivery", flat: 95, perMile: 0 },
  { id: "team", code: "TEA", label: "Team drive", detail: "Two drivers, near-continuous movement", flat: 250, perMile: 0.58 },
  { id: "inside", code: "INS", label: "Inside delivery", detail: "Freight moved past the dock door", flat: 135, perMile: 0 },
];

const ESTIMATOR_MIN_CHARGE = 385;
const ESTIMATOR_WEIGHT_FREE = 20000;
const ESTIMATOR_METER_FLOOR = 1;
const ESTIMATOR_METER_CEIL = 24;
// Decade ticks, not even ones: the scale is logarithmic.
const ESTIMATOR_METER_TICKS = [1, 2, 4, 8, 16, 24];
const ESTIMATOR_GAUGE_SPAN = 1.2;

const estimatorNumber = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function formatFigure(value) {
  return estimatorNumber.format(Math.round(value));
}

function clampRange(value, range) {
  return Math.min(range.max, Math.max(range.min, value));
}

function floorToStep(value, step) {
  return Math.floor(value / step) * step;
}

function ceilToStep(value, step) {
  return Math.ceil(value / step) * step;
}

// The per-mile figure spans roughly $1.80 on a long cheap lane to $22.50 on the
// high edge of a 50-mile minimum-charge haul. A linear axis would pin almost
// every real lane into the leftmost sixth, so the meter reads logarithmically.
function logPercentOf(value, min, max) {
  const span = Math.log(max) - Math.log(min);
  const at = Math.log(Math.min(max, Math.max(min, value))) - Math.log(min);
  return (at / span) * 100;
}

function percentOf(value, min, max) {
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

// Per-mile linehaul rate before any multiplier. Tapers with distance: a short
// haul still has to pay for a whole driver day, a long haul amortises it.
//    50 mi -> $3.99/mi     400 mi -> $2.40/mi     780 mi -> $1.98/mi
//  1600 mi -> $1.68/mi    2800 mi -> $1.53/mi
function estimatorBaseRate(miles) {
  return 1.32 + 640 / (miles + 190);
}

// Freight under 20,000 lb rides free. Above that it costs up to 22% more.
function estimatorWeightFactor(weight) {
  return 1 + (Math.max(0, weight - ESTIMATOR_WEIGHT_FREE) / 25000) * 0.22;
}

function estimatorFit(state) {
  const { miles, weight, equipment, service, loadFactor, accessorials } = state;

  if (weight > equipment.payload) {
    return `${formatFigure(weight)} lb sits over the ${equipment.label.toLowerCase()} payload line. We would split the freight or source a lightweight tractor before quoting it.`;
  }
  if (service.id === "expedited" && miles > 1100 && !accessorials.team) {
    return `${formatFigure(miles)} mi against an expedited window runs a solo driver out of hours. Add team drive, or expect the delivery window to move.`;
  }
  if (miles < 250) {
    return "Under 250 mi you are buying a driver day, not an odometer reading. The per-mile figure reads high here and that is normal for a short haul.";
  }
  if (equipment.id === "reefer" && service.id !== "standard") {
    return "Temp-controlled capacity on a tight window is the thin part of the market. Give us 48 hours of notice and this band holds.";
  }
  if (equipment.id === "flatbed" && loadFactor > 0.8) {
    return "Heavy open-deck freight. Securement, tarping and permit checks move the final number more than the mileage does.";
  }
  if (loadFactor < 0.3 && miles > 900) {
    return "Light freight on a long lane. Worth pricing this against partial or LTL space before you commit a full trailer.";
  }
  if (accessorials.liftgate && accessorials.inside) {
    return "Liftgate plus inside delivery means dwell at the receiver. Lock the appointment window early so the driver is not sitting.";
  }
  if (loadFactor > 0.92) {
    return "Close to the payload ceiling. Axle weights get checked at the scale, so confirm pallet count and distribution before pickup.";
  }
  return `Standard ${equipment.label.toLowerCase()} lane, well inside our regular capacity pool. Expect firm carrier options within a day of the details landing.`;
}

function estimateLane(input) {
  const equipment =
    ESTIMATOR_EQUIPMENT.find((item) => item.id === input.equipmentId) || ESTIMATOR_EQUIPMENT[0];
  const service =
    ESTIMATOR_SERVICE.find((item) => item.id === input.serviceId) || ESTIMATOR_SERVICE[0];
  const accessorials = input.accessorials;
  const miles = clampRange(input.miles, ESTIMATOR_LIMITS.miles);
  const weight = clampRange(input.weight, ESTIMATOR_LIMITS.weight);

  const active = ESTIMATOR_ACCESSORIALS.filter((item) => accessorials[item.id]);
  const baseRate = estimatorBaseRate(miles);
  const weightFactor = estimatorWeightFactor(weight);
  const loadedRate = baseRate * equipment.rate * service.rate * weightFactor;

  const linehaul = Math.round(miles * loadedRate);
  const fuel = Math.round(miles * equipment.fuel);
  const accessorialTotal = active.reduce(
    (sum, item) => sum + item.flat + Math.round(item.perMile * miles),
    0,
  );

  const raw = linehaul + fuel + accessorialTotal;
  const floorAdjustment = Math.max(0, ESTIMATOR_MIN_CHARGE - raw);
  const mid = raw + floorAdjustment;

  let spread = service.spread;
  if (miles < 350) spread += 0.03;
  if (weight > 38000) spread += 0.02;
  if (active.length > 1) spread += 0.01;

  // The minimum charge is a floor on what we will actually book, so the band's
  // low edge has to respect it too, not just the midpoint. Without this a short
  // haul prints a band opening below the very floor the ledger says was applied.
  const rateLow = Math.max(ESTIMATOR_MIN_CHARGE, floorToStep(mid * (1 - spread), 25));
  const rateHigh = Math.max(rateLow + 25, ceilToStep(mid * (1 + spread), 25));

  const perMile = mid / miles;
  const perMileLow = rateLow / miles;
  const perMileHigh = rateHigh / miles;

  const dailyMiles = service.milesPerDay * (accessorials.team ? 1.8 : 1);
  const transitLow = Math.max(1, Math.ceil((miles / dailyMiles) * equipment.transit));
  const transitHigh = transitLow + service.pad + (weight > equipment.payload ? 1 : 0);

  const loadFactor = weight / equipment.payload;

  return {
    miles,
    weight,
    equipment,
    service,
    active,
    baseRate,
    weightFactor,
    loadedRate,
    linehaul,
    fuel,
    accessorialTotal,
    floorAdjustment,
    mid,
    spread,
    rateLow,
    rateHigh,
    perMile,
    perMileLow,
    perMileHigh,
    transitLow,
    transitHigh,
    loadFactor,
    lamps: [
      { code: "OVR", label: "Over payload", on: weight > equipment.payload },
      { code: "SHT", label: "Short haul", on: miles < 250 },
      { code: "TEA", label: "Team drive", on: Boolean(accessorials.team) },
      { code: "EXP", label: "Expedited", on: service.id === "expedited" },
      { code: "TMP", label: "Temperature control", on: equipment.id === "reefer" },
      { code: "MIN", label: "Minimum charge applied", on: floorAdjustment > 0 },
    ],
    fit: estimatorFit({ miles, weight, equipment, service, loadFactor, accessorials }),
    summary: `Indicative band, ${formatFigure(rateLow)} to ${formatFigure(rateHigh)} US dollars. ${perMile.toFixed(2)} dollars per mile. Transit ${transitLow === transitHigh ? `${transitLow} day${transitLow === 1 ? "" : "s"}` : `${transitLow} to ${transitHigh} days`} on a ${equipment.label.toLowerCase()}, ${service.label.toLowerCase()} service.`,
  };
}

const TRACK_UNIT = 100;
const TRACK_RATE = 55;
const TRACK_SPEEDS = [1, 2, 4];
const TRACK_VIEW = { w: 1000, h: 560 };
const TRACK_DAYS = ["TUE", "WED", "THU", "FRI"];
const TRACK_START_MINUTES = 7 * 60;

const trackerMilestones = [
  {
    code: "01",
    status: "Booked",
    place: "Dallas, TX / Broker desk",
    detail:
      "Lane confirmed and rate agreed. Load number LDN-77413 issued, shipper contacted for dock hours.",
    hour: 0,
    mile: 0,
    coord: [32.814, -96.87],
    point: [84, 468],
  },
  {
    code: "02",
    status: "Carrier assigned",
    place: "Dallas, TX / Dispatch",
    detail:
      "Capacity matched: 53-foot dry van. Authority and insurance verified, driver dispatched to the shipper.",
    hour: 3,
    mile: 0,
    coord: [32.7767, -96.797],
    point: [206, 448],
  },
  {
    code: "03",
    status: "Picked up",
    place: "Garland, TX / Shipper dock",
    detail:
      "Loaded and sealed. 18 pallets, 24,400 lbs, seal LDN-4471, bill of lading signed at the gate.",
    hour: 9,
    mile: 12,
    coord: [32.9126, -96.6389],
    point: [322, 476],
  },
  {
    code: "04",
    status: "In transit",
    place: "I-30 near Little Rock, AR",
    detail:
      "Rolling northeast on the primary corridor. Position and hours of service checked every four hours.",
    hour: 22,
    mile: 320,
    coord: [34.7465, -92.2896],
    point: [470, 372],
  },
  {
    code: "05",
    status: "Checkpoint",
    place: "Litchfield, IL / Scale house",
    detail:
      "Weigh station cleared and DOT inspection passed. Seal intact, 41 minutes against the clock.",
    hour: 33,
    mile: 610,
    coord: [39.1753, -89.654],
    point: [620, 292],
  },
  {
    code: "06",
    status: "Out for delivery",
    place: "Bolingbrook, IL / Final leg",
    detail:
      "Trailer staged overnight near the receiver. Appointment confirmed for the 09:00 dock window.",
    hour: 47,
    mile: 890,
    coord: [41.6986, -88.0684],
    point: [786, 168],
  },
  {
    code: "07",
    status: "Delivered",
    place: "Chicago, IL / Receiver dock",
    detail:
      "Unloaded, counted, and signed. Proof of delivery attached to the load file and sent to the shipper.",
    hour: 50,
    mile: 925,
    coord: [41.8781, -87.6298],
    point: [918, 104],
  },
];

const trackerLegs = [
  { c1: [126, 452], c2: [166, 440] },
  { c1: [250, 456], c2: [286, 472] },
  { c1: [382, 482], c2: [418, 412] },
  { c1: [520, 336], c2: [566, 318] },
  { c1: [686, 262], c2: [734, 220] },
  { c1: [828, 128], c2: [872, 110] },
];

const TRACK_MAX = trackerLegs.length * TRACK_UNIT;
const TRACK_TOTAL_MILES = trackerMilestones[trackerMilestones.length - 1].mile;

const trackerRoutePath = trackerLegs.reduce((path, leg, index) => {
  const end = trackerMilestones[index + 1].point;
  return `${path} C ${leg.c1[0]} ${leg.c1[1]} ${leg.c2[0]} ${leg.c2[1]} ${end[0]} ${end[1]}`;
}, `M ${trackerMilestones[0].point[0]} ${trackerMilestones[0].point[1]}`);

function trackLerp(a, b, t) {
  return a + (b - a) * t;
}

function trackLerpPoint(a, b, t) {
  return [trackLerp(a[0], b[0], t), trackLerp(a[1], b[1], t)];
}

function trackLegPoints(legIndex) {
  const leg = trackerLegs[legIndex];
  return [
    trackerMilestones[legIndex].point,
    leg.c1,
    leg.c2,
    trackerMilestones[legIndex + 1].point,
  ];
}

// De Casteljau: exact point, tangent heading, and the left-hand split of the leg.
function trackCubicAt(points, t) {
  const [p0, p1, p2, p3] = points;
  const a = trackLerpPoint(p0, p1, t);
  const b = trackLerpPoint(p1, p2, t);
  const c = trackLerpPoint(p2, p3, t);
  const d = trackLerpPoint(a, b, t);
  const e = trackLerpPoint(b, c, t);
  const point = trackLerpPoint(d, e, t);
  let dx = e[0] - d[0];
  let dy = e[1] - d[1];
  if (dx === 0 && dy === 0) {
    dx = p3[0] - p0[0];
    dy = p3[1] - p0[1];
  }
  return { point, heading: (Math.atan2(dy, dx) * 180) / Math.PI, left: [p0, a, d, point] };
}

function trackSegment(position) {
  const clamped = Math.min(Math.max(position, 0), TRACK_MAX);
  const rawLeg = Math.floor(clamped / TRACK_UNIT);
  const legIndex = Math.min(rawLeg, trackerLegs.length - 1);
  return {
    clamped,
    legIndex,
    legT: (clamped - legIndex * TRACK_UNIT) / TRACK_UNIT,
    index: Math.min(rawLeg, trackerLegs.length),
  };
}

function trackerTraveledPath(position) {
  const { legIndex, legT } = trackSegment(position);
  const origin = trackerMilestones[0].point;
  let path = `M ${origin[0]} ${origin[1]}`;
  for (let i = 0; i < legIndex; i += 1) {
    const [, c1, c2, end] = trackLegPoints(i);
    path += ` C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${end[0]} ${end[1]}`;
  }
  const [, a, b, c] = trackCubicAt(trackLegPoints(legIndex), legT).left;
  return `${path} C ${a[0].toFixed(2)} ${a[1].toFixed(2)} ${b[0].toFixed(2)} ${b[1].toFixed(2)} ${c[0].toFixed(2)} ${c[1].toFixed(2)}`;
}

function formatTrackClock(hours) {
  const total = TRACK_START_MINUTES + Math.round(hours * 60);
  const day = TRACK_DAYS[Math.min(Math.floor(total / 1440), TRACK_DAYS.length - 1)];
  const rest = total % 1440;
  return `${day} ${String(Math.floor(rest / 60)).padStart(2, "0")}:${String(rest % 60).padStart(2, "0")}`;
}

function formatTrackElapsed(hours) {
  const total = Math.max(0, Math.round(hours * 60));
  const days = Math.floor(total / 1440);
  const hh = Math.floor((total % 1440) / 60);
  if (days > 0) return `${days}D ${String(hh).padStart(2, "0")}H`;
  return `${String(hh).padStart(2, "0")}H ${String(total % 60).padStart(2, "0")}M`;
}

function formatTrackMiles(miles) {
  return Math.round(miles).toLocaleString("en-US");
}

function formatTrackCoord(coord) {
  return `${coord[0].toFixed(3)}° N / ${Math.abs(coord[1]).toFixed(3)}° W`;
}

function trackerReadout(position) {
  const { clamped, legIndex, legT, index } = trackSegment(position);
  const from = trackerMilestones[legIndex];
  const to = trackerMilestones[legIndex + 1];
  const { point, heading } = trackCubicAt(trackLegPoints(legIndex), legT);
  const miles = trackLerp(from.mile, to.mile, legT);

  return {
    position: clamped,
    index,
    point,
    heading,
    hours: trackLerp(from.hour, to.hour, legT),
    miles,
    milesLeft: TRACK_TOTAL_MILES - miles,
    coord: [
      trackLerp(from.coord[0], to.coord[0], legT),
      trackLerp(from.coord[1], to.coord[1], legT),
    ],
    current: trackerMilestones[index],
    next: index < trackerLegs.length ? trackerMilestones[index + 1] : null,
    progress: clamped / TRACK_MAX,
    moving: legT > 0.001 && legT < 0.999,
  };
}

function App() {
  const appRef = useRef(null);
  const menuToggleRef = useRef(null);
  const navRef = useRef(null);
  const serviceBoardRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState("");
  const [quoteBrief, setQuoteBrief] = useState("");

  useLayoutEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    if (!menuOpen) {
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      return () => document.body.classList.remove("menu-open");
    }

    if (main) main.inert = true;
    if (footer) footer.inert = true;

    const desktopQuery = window.matchMedia("(min-width: 961px)");
    const closeAtDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    const handleMenuKeys = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuToggleRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [
        document.querySelector(".site-header .brand"),
        menuToggleRef.current,
        ...navRef.current.querySelectorAll("a"),
      ].filter((item) => item && item.getClientRects().length);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    document.addEventListener("keydown", handleMenuKeys);

    return () => {
      desktopQuery.removeEventListener("change", closeAtDesktop);
      document.removeEventListener("keydown", handleMenuKeys);
      document.body.classList.remove("menu-open");
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => gsap.set(".hero-line", { overflow: "visible" }),
        });

        intro
          .from(".site-header", {
            y: -26,
            autoAlpha: 0,
            duration: 0.7,
            onComplete: () => gsap.set(".site-header", { clearProps: "transform" }),
          })
          .from(".hero-kicker", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.25")
          .from(
            ".hero-line > span",
            { yPercent: 115, rotate: 2.5, duration: 0.92, stagger: 0.09 },
            "-=0.35",
          )
          .from(".hero-copy, .hero-actions, .hero-meta", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, "-=0.55")
          .from(".hero-visual", { x: 42, autoAlpha: 0, duration: 0.95 }, "-=0.85")
          .fromTo(".route-main", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.65");

        gsap.to(".load-marker", {
          duration: 7.5,
          ease: "none",
          repeat: -1,
          motionPath: {
            path: "#hero-route",
            align: "#hero-route",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        gsap.to(".ticker-track", {
          xPercent: -50,
          ease: "none",
          duration: 26,
          repeat: -1,
          scrollTrigger: {
            trigger: ".mode-ticker",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        gsap.utils.toArray("[data-reveal]").forEach((item) => {
          gsap.from(item, {
            y: 52,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          });
        });

        gsap.utils.toArray("[data-parallax]").forEach((item) => {
          gsap.to(item, {
            yPercent: Number(item.dataset.parallax),
            ease: "none",
            scrollTrigger: {
              trigger: item.closest("section"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        gsap.fromTo(
          ".process-line__fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-steps",
              start: "top 74%",
              end: "bottom 58%",
              scrub: 1,
            },
          },
        );

        gsap.from(".process-step", {
          y: 42,
          autoAlpha: 0,
          duration: 0.65,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 76%",
            once: true,
          },
        });

        gsap.fromTo(
          ".why-statement__line",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".why-statement",
              start: "top 70%",
              end: "bottom 70%",
              scrub: 1,
            },
          },
        );

        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "max",
            scrub: 0.25,
          },
        });
      });
    }, appRef);

    let mounted = true;
    document.fonts?.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });

    return () => {
      mounted = false;
      mm.revert();
      context.revert();
    };
  }, []);

  useEffect(() => {
    const visual = serviceBoardRef.current?.querySelector(".service-board__visual");
    if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });

      timeline.fromTo(
        visual,
        { autoAlpha: 0, x: 24 },
        { autoAlpha: 1, x: 0, duration: 0.42, ease: "power2.out" },
      );
      timeline
        .fromTo(
          visual.querySelectorAll(".schematic-track--active"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.78, stagger: 0.1, ease: "power2.inOut" },
          "-=0.24",
        )
        .fromTo(
          visual.querySelectorAll(".schematic-pop"),
          { autoAlpha: 0, scale: 0.82 },
          { autoAlpha: 1, scale: 1, duration: 0.38, stagger: 0.045, ease: "back.out(1.8)" },
          "-=0.48",
        );
    }, serviceBoardRef);

    return () => context.revert();
  }, [activeService]);

  const closeMenu = () => setMenuOpen(false);

  const handleQuote = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const brief = [
      "LONDON TRUCKING — FREIGHT QUOTE BRIEF",
      "",
      `Contact: ${data.get("name")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Email: ${data.get("email")}`,
      `Origin: ${data.get("origin")}`,
      `Destination: ${data.get("destination")}`,
      `Freight type: ${data.get("freight")}`,
      `Ready date: ${data.get("date") || "To be confirmed"}`,
    ].join("\n");

    setQuoteBrief(brief);

    try {
      await navigator.clipboard.writeText(brief);
      setQuoteStatus("Load brief copied. It is also available below for review.");
    } catch {
      setQuoteStatus("Your load brief is ready below. Select and copy it to continue.");
    }
  };

  const copyQuoteBrief = async () => {
    try {
      await navigator.clipboard.writeText(quoteBrief);
      setQuoteStatus("Load brief copied.");
    } catch {
      setQuoteStatus("Select the brief below and copy it manually.");
    }
  };

  const downloadQuoteBrief = () => {
    const file = new Blob([quoteBrief], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "london-trucking-load-brief.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setQuoteStatus("Load brief downloaded.");
  };

  const clearPreparedBrief = () => {
    if (quoteStatus) setQuoteStatus("");
    if (quoteBrief) setQuoteBrief("");
  };

  // Lane estimator — refs
  const consoleRef = useRef(null);
  const rateLowRef = useRef(null);
  const rateHighRef = useRef(null);
  const rateMileRef = useRef(null);
  const rateProxyRef = useRef({ low: 0, high: 0, mile: 0 });

  // Lane estimator — state
  const [laneMiles, setLaneMiles] = useState(ESTIMATOR_LIMITS.miles.initial);
  const [laneWeight, setLaneWeight] = useState(ESTIMATOR_LIMITS.weight.initial);
  const [laneEquipment, setLaneEquipment] = useState("van");
  const [laneService, setLaneService] = useState("standard");
  const [laneAccessorials, setLaneAccessorials] = useState({
    liftgate: false,
    team: false,
    inside: false,
  });
  const [laneSummary, setLaneSummary] = useState("");

  // Lane estimator — derived. estimateLane is pure and cheap (a dozen multiplies),
  // so it runs every render; no memo needed and no stale-state class of bug.
  const estimate = estimateLane({
    miles: laneMiles,
    weight: laneWeight,
    equipmentId: laneEquipment,
    serviceId: laneService,
    accessorials: laneAccessorials,
  });
  const milesFill = percentOf(laneMiles, ESTIMATOR_LIMITS.miles.min, ESTIMATOR_LIMITS.miles.max);
  const weightFill = percentOf(laneWeight, ESTIMATOR_LIMITS.weight.min, ESTIMATOR_LIMITS.weight.max);

  // Lane estimator — handlers
  const nudgeMiles = (delta) =>
    setLaneMiles((value) => clampRange(value + delta, ESTIMATOR_LIMITS.miles));
  const nudgeWeight = (delta) =>
    setLaneWeight((value) => clampRange(value + delta, ESTIMATOR_LIMITS.weight));
  const toggleAccessorial = (id) =>
    setLaneAccessorials((previous) => ({ ...previous, [id]: !previous[id] }));

  // Lane estimator — odometer roll on the three headline figures.
  // React deliberately renders those three spans EMPTY and GSAP owns their
  // textContent, so the two never fight over the same text node. The accessible
  // copy of every figure is rendered by React as sibling .sr-only text.
  useLayoutEffect(() => {
    const lowNode = rateLowRef.current;
    const highNode = rateHighRef.current;
    const mileNode = rateMileRef.current;
    if (!lowNode || !highNode || !mileNode) return undefined;

    const proxy = rateProxyRef.current;
    const paint = () => {
      lowNode.textContent = formatFigure(proxy.low);
      highNode.textContent = formatFigure(proxy.high);
      mileNode.textContent = proxy.mile.toFixed(2);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      proxy.low = estimate.rateLow;
      proxy.high = estimate.rateHigh;
      proxy.mile = estimate.perMile;
      paint();
      return undefined;
    }

    paint();

    const context = gsap.context(() => {
      gsap.to(proxy, {
        low: estimate.rateLow,
        high: estimate.rateHigh,
        mile: estimate.perMile,
        duration: 0.42,
        ease: "power2.out",
        overwrite: true,
        onUpdate: paint,
      });
    }, consoleRef);

    // kill(), not revert(): the tween target is a plain object, and reverting
    // would rewind it to the previous figures a frame before the next tween
    // reads them as its start values.
    return () => context.kill();
  }, [estimate.rateLow, estimate.rateHigh, estimate.perMile]);

  // Lane estimator — one-shot power-on sequence when the console scrolls in.
  useLayoutEffect(() => {
    const root = consoleRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".channel, .console__group", {
          y: 18,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        });

        gsap.from(".tile, .ledger tbody tr", {
          autoAlpha: 0,
          duration: 0.28,
          stagger: 0.035,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        });

        gsap.from(".lamp", {
          autoAlpha: 0.15,
          duration: 0.14,
          ease: "steps(1)",
          stagger: { each: 0.06, repeat: 1, yoyo: true },
          scrollTrigger: { trigger: root, start: "top 62%", once: true },
        });
      });
    }, consoleRef);

    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  // Lane estimator — debounced screen-reader summary. Dragging a fader fires
  // dozens of updates a second; announcing each one is unusable, so the polite
  // region only takes the value once the panel has been still for 700ms.
  useEffect(() => {
    const timer = window.setTimeout(() => setLaneSummary(estimate.summary), 700);
    return () => window.clearTimeout(timer);
  }, [estimate.summary]);

  // --- state + refs -----------------------------------------------------------
  const trackerRef = useRef(null);
  const trackMapRef = useRef(null);
  const trackPhaseRef = useRef(null);
  const trackNodeRefs = useRef([]);
  const trackPositionRef = useRef(0);
  const trackSpeedRef = useRef(1);
  const trackTouchedRef = useRef(false);
  const trackArmedRef = useRef(false);
  const [trackPosition, setTrackPosition] = useState(0);
  const [trackPlaying, setTrackPlaying] = useState(false);
  const [trackSpeed, setTrackSpeed] = useState(1);
  const [trackFocusIndex, setTrackFocusIndex] = useState(0);
  const [trackGlide, setTrackGlide] = useState(null);

  // --- derived values, computed in the render body ----------------------------
  const trackRead = trackerReadout(trackPosition);
  const trackTraveled = trackerTraveledPath(trackPosition);
  const trackIndex = trackRead.index;
  const trackTruckX = trackRead.point[0];
  const trackAtEnd = trackRead.position >= TRACK_MAX;
  const trackPlayLabel = trackPlaying ? "Pause" : trackAtEnd ? "Replay" : "Play";
  const trackStateLabel = trackAtEnd ? "Delivered" : trackRead.moving ? "En route" : "At stage";
  const trackScrubText = `Stage ${trackRead.current.code} of 07, ${trackRead.current.status}. ${Math.round(
    trackRead.progress * 100,
  )} percent of route, ${formatTrackMiles(trackRead.miles)} miles run, elapsed ${formatTrackElapsed(
    trackRead.hours,
  )}.`;

  // --- handlers ---------------------------------------------------------------
  const setTrackTo = (value) => {
    const clamped = Math.min(Math.max(value, 0), TRACK_MAX);
    trackPositionRef.current = clamped;
    setTrackPosition(clamped);
  };

  const toggleTrackPlay = () => {
    trackTouchedRef.current = true;
    setTrackGlide(null);
    if (trackPlaying) {
      setTrackPlaying(false);
      return;
    }
    if (trackPositionRef.current >= TRACK_MAX) setTrackTo(0);
    setTrackPlaying(true);
  };

  const glideToMilestone = (index) => {
    trackTouchedRef.current = true;
    setTrackPlaying(false);
    setTrackFocusIndex(index);

    const to = index * TRACK_UNIT;
    const from = trackPositionRef.current;
    if (Math.abs(to - from) < 0.5) {
      setTrackGlide(null);
      setTrackTo(to);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTrackGlide(null);
      setTrackTo(to);
      return;
    }
    setTrackGlide({ from, to, duration: 260 + (Math.abs(to - from) / TRACK_MAX) * 900 });
  };

  const handleTrackPrev = () =>
    glideToMilestone(Math.max(0, Math.ceil(trackPositionRef.current / TRACK_UNIT) - 1));

  const handleTrackNext = () =>
    glideToMilestone(
      Math.min(trackerLegs.length, Math.floor(trackPositionRef.current / TRACK_UNIT) + 1),
    );

  const handleTrackRestart = () => {
    trackTouchedRef.current = true;
    setTrackPlaying(false);
    setTrackGlide(null);
    setTrackFocusIndex(0);
    setTrackTo(0);
  };

  const handleTrackScrub = (event) => {
    trackTouchedRef.current = true;
    setTrackPlaying(false);
    setTrackGlide(null);
    setTrackTo(Number(event.target.value));
  };

  const handleTrackNodeKeys = (event, index) => {
    const last = trackerMilestones.length - 1;
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(index + 1, last);
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(index - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setTrackFocusIndex(next);
    trackNodeRefs.current[next]?.focus();
  };

  // --- effects ----------------------------------------------------------------
  useEffect(() => {
    trackSpeedRef.current = trackSpeed;
  }, [trackSpeed]);

  // Playback loop. Stops cleanly at the end and cancels its frame on unmount.
  useEffect(() => {
    if (!trackPlaying) return undefined;

    let frame = 0;
    let last = performance.now();

    const step = (now) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      const next = trackPositionRef.current + delta * TRACK_RATE * trackSpeedRef.current;

      if (next >= TRACK_MAX) {
        trackPositionRef.current = TRACK_MAX;
        setTrackPosition(TRACK_MAX);
        setTrackPlaying(false);
        return;
      }

      trackPositionRef.current = next;
      setTrackPosition(next);
      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [trackPlaying]);

  // Eased glide when a node, prev, or next is used: the truck drives, never teleports.
  useEffect(() => {
    if (!trackGlide) return undefined;

    const { from, to, duration } = trackGlide;
    let frame = 0;
    const started = performance.now();

    const run = (now) => {
      const t = Math.min((now - started) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
      const value = from + (to - from) * eased;
      trackPositionRef.current = value;
      setTrackPosition(value);
      if (t < 1) {
        frame = window.requestAnimationFrame(run);
        return;
      }
      setTrackGlide(null);
    };

    frame = window.requestAnimationFrame(run);
    return () => window.cancelAnimationFrame(frame);
  }, [trackGlide]);

  // Arm auto-play once, on entry, only for visitors who have not asked for less
  // motion and have not already taken control. Pause whenever it leaves the screen.
  useEffect(() => {
    const node = trackerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setTrackPlaying(false);
            return;
          }
          if (reduced.matches || trackTouchedRef.current || trackArmedRef.current) return;
          trackArmedRef.current = true;
          setTrackPlaying(true);
        });
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Keep the truck in view when the map has to scroll horizontally on small screens.
  useEffect(() => {
    const map = trackMapRef.current;
    if (!map) return;
    const overflow = map.scrollWidth - map.clientWidth;
    if (overflow <= 1) return;
    const target = (trackTruckX / TRACK_VIEW.w) * map.scrollWidth - map.clientWidth / 2;
    map.scrollLeft = Math.min(Math.max(target, 0), overflow);
  }, [trackTruckX]);

  // Milestone flourish: readout copy settles in, the reached node throws one ring.
  useEffect(() => {
    if (!trackerRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".tracker__phase-title, .tracker__phase-place, .tracker__phase-note",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out", overwrite: "auto" },
      );
      gsap.fromTo(
        ".tracker__node.is-current .tracker__node-ring",
        { scale: 0.35, autoAlpha: 0.85 },
        { scale: 2.4, autoAlpha: 0, duration: 0.85, ease: "power2.out", overwrite: "auto" },
      );
    }, trackerRef);

    return () => context.revert();
  }, [trackIndex]);

  return (
    <div className="site" ref={appRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <div className="header-inner">
          <Logo onClick={closeMenu} />

          <button
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            ref={menuToggleRef}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav id="primary-navigation" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation" ref={navRef}>
            <a href="#approach" onClick={closeMenu}>Approach</a>
            <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
            <a href="#process" onClick={closeMenu}>How it moves</a>
            <a className="nav-quote" href="#quote" onClick={closeMenu}>Move a load</a>
          </nav>

          <a className="header-cta" href="#quote">
            <span>Move a load</span>
            <Arrow />
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-content">
              <p className="section-kicker hero-kicker">
                <span>General Freight Brokerage</span>
                <span>Broker ID / LDN</span>
              </p>

              <h1 className="hero-title" aria-label="Freight, without the friction.">
                <span className="hero-line"><span>Freight,</span></span>
                <span className="hero-line"><span>without the</span></span>
                <span className="hero-line hero-line--accent"><span>friction.</span></span>
              </h1>

              <p className="hero-copy">
                London Trucking connects shippers with carrier capacity and keeps every moving part coordinated—from first quote through final delivery.
              </p>

              <div className="hero-actions">
                <a className="button button--signal" href="#quote">
                  <span>Plan a shipment</span>
                  <Arrow />
                </a>
                <a className="text-link" href="#capabilities">
                  Explore capabilities <Arrow diagonal />
                </a>
              </div>

              <div className="hero-meta" aria-label="Service principles">
                <span>01 / Clear answers</span>
                <span>02 / Flexible capacity</span>
                <span>03 / Human follow-through</span>
              </div>
            </div>

            <div className="hero-visual">
              <HeroRoute />
            </div>
          </div>

          <div className="hero-side-note" aria-hidden="true">
            <span>SCROLL TO ROUTE</span>
            <i />
          </div>
        </section>

        <div className="mode-ticker" aria-label="Freight capabilities">
          <div className="ticker-track">
            {[0, 1].map((set) => (
              <div className="ticker-set" key={set} aria-hidden={set === 1}>
                {tickerItems.map((item) => (
                  <span key={`${set}-${item}`}><i />{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="approach" id="approach">
          <div className="section-wrap">
            <div className="section-index" data-reveal>
              <span>01</span>
              <p>A clearer way to move</p>
            </div>

            <div className="approach-copy">
              <h2 data-reveal>
                One point of contact.<br />
                <em>Every detail in motion.</em>
              </h2>
              <p data-reveal>
                Freight is rarely just point A to point B. It is timing, capacity, communication, and quick decisions when conditions change. We bring those pieces together so your team can keep moving.
              </p>
            </div>

            <div className="principles" data-reveal>
              <article>
                <span>01 / COMMS</span>
                <h3>Clear communication</h3>
                <p>Useful updates, direct answers, and fewer unknowns throughout the shipment.</p>
              </article>
              <article>
                <span>02 / FLEX</span>
                <h3>Flexible coordination</h3>
                <p>Support shaped around one-time loads, recurring lanes, and changing freight needs.</p>
              </article>
              <article>
                <span>03 / EXEC</span>
                <h3>Focused execution</h3>
                <p>Pickup requirements, delivery windows, and load details aligned before wheels turn.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="capabilities" id="capabilities">
          <div className="section-wrap">
            <div className="capabilities-heading">
              <div className="section-index section-index--light" data-reveal>
                <span>02</span>
                <p>Capabilities</p>
              </div>
              <h2 data-reveal>Built around<br />the way<br /><em>your freight moves.</em></h2>
              <p data-reveal>
                From a single shipment to ongoing lanes, coordination starts with the route, schedule, freight, and handling requirements in front of us.
              </p>
            </div>

            <div className="service-selector" data-reveal>
              <div className="service-list" role="group" aria-label="Freight services">
                {services.map((service, index) => (
                  <button
                    className={`service-item${activeService === index ? " is-active" : ""}`}
                    type="button"
                    key={service.code}
                    aria-pressed={activeService === index}
                    onMouseEnter={() => setActiveService(index)}
                    onFocus={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                  >
                    <span className="service-item__code">{service.code}</span>
                    <span className="service-item__body">
                      <strong>{service.title}</strong>
                      <span>{service.description}</span>
                    </span>
                    <span className="service-item__toggle" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>

              <div className="service-board" aria-live="polite" ref={serviceBoardRef}>
                <div className="service-board__top">
                  <span>LDN / MODE SELECT</span>
                  <span>{services[activeService].code} OF 04</span>
                </div>
                <p className="service-board__description">{services[activeService].description}</p>
                <ServiceDiagram service={services[activeService]} />
                <div className="service-board__tags">
                  {services[activeService].tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>

            <p className="availability-note">
              <span>NOTE</span> Availability and equipment options vary by lane, timing, and shipment requirements.
            </p>
          </div>
        </section>

        <section className="estimator" id="estimate">
          <div className="estimator__backdrop" data-parallax="-6" aria-hidden="true" />

          <div className="section-wrap">
            <div className="estimator__heading">
              <div className="section-index" data-reveal>
                <span>03</span>
                <p>Lane estimator</p>
              </div>
              <h2 data-reveal>Tune the lane.<br /><em>Read the number.</em></h2>
              <p data-reveal>
                Move the controls and the console recalculates. Distance taper, equipment, service level and accessorials all price in front of you, with the arithmetic left on the panel.
              </p>
            </div>

            <div className="console" ref={consoleRef} data-reveal>
              <div className="console__bar">
                <span className="console__bar-id">LDN / LANE ESTIMATOR</span>
                <span className="console__bar-rev">REV 24.3 &middot; US DOMESTIC</span>
                <span className="console__bar-lamp"><i aria-hidden="true" />LIVE</span>
              </div>

              <div className="console__grid">
                <div className="console__bank console__bank--input">
                  <div className="console__bank-head">
                    <h3 className="console__bank-title">Input bank</h3>
                    <span className="console__bank-meta">05 CHANNELS</span>
                  </div>

                  <div className="channel">
                    <div className="channel__head">
                      <label className="channel__label" htmlFor="ldn-miles">Trip distance</label>
                      <div className="channel__trim">
                        <button
                          className="channel__trim-key"
                          type="button"
                          aria-label="Decrease trip distance by 10 miles"
                          onClick={() => nudgeMiles(-ESTIMATOR_LIMITS.miles.step)}
                        >
                          &#8722;
                        </button>
                        <p className="channel__value">
                          <span className="channel__digits">{formatFigure(laneMiles)}</span>
                          <span className="channel__unit">MI</span>
                        </p>
                        <button
                          className="channel__trim-key"
                          type="button"
                          aria-label="Increase trip distance by 10 miles"
                          onClick={() => nudgeMiles(ESTIMATOR_LIMITS.miles.step)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="channel__shell" style={{ "--fill": `${milesFill}%` }}>
                      <span className="channel__ruler" aria-hidden="true" />
                      <span className="channel__fill" aria-hidden="true" />
                      <input
                        className="channel__fader"
                        id="ldn-miles"
                        type="range"
                        min={ESTIMATOR_LIMITS.miles.min}
                        max={ESTIMATOR_LIMITS.miles.max}
                        step={ESTIMATOR_LIMITS.miles.step}
                        value={laneMiles}
                        aria-valuetext={`${formatFigure(laneMiles)} miles`}
                        onChange={(event) => setLaneMiles(Number(event.target.value))}
                      />
                    </div>
                    <p className="channel__scale" aria-hidden="true">
                      {ESTIMATOR_LIMITS.miles.ticks.map((tick) => <span key={tick}>{tick}</span>)}
                    </p>
                  </div>

                  <div className="channel">
                    <div className="channel__head">
                      <label className="channel__label" htmlFor="ldn-weight">Freight weight</label>
                      <div className="channel__trim">
                        <button
                          className="channel__trim-key"
                          type="button"
                          aria-label="Decrease freight weight by 500 pounds"
                          onClick={() => nudgeWeight(-ESTIMATOR_LIMITS.weight.step)}
                        >
                          &#8722;
                        </button>
                        <p className="channel__value">
                          <span className="channel__digits">{formatFigure(laneWeight)}</span>
                          <span className="channel__unit">LB</span>
                        </p>
                        <button
                          className="channel__trim-key"
                          type="button"
                          aria-label="Increase freight weight by 500 pounds"
                          onClick={() => nudgeWeight(ESTIMATOR_LIMITS.weight.step)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="channel__shell" style={{ "--fill": `${weightFill}%` }}>
                      <span className="channel__ruler" aria-hidden="true" />
                      <span className="channel__fill" aria-hidden="true" />
                      <input
                        className="channel__fader"
                        id="ldn-weight"
                        type="range"
                        min={ESTIMATOR_LIMITS.weight.min}
                        max={ESTIMATOR_LIMITS.weight.max}
                        step={ESTIMATOR_LIMITS.weight.step}
                        value={laneWeight}
                        aria-valuetext={`${formatFigure(laneWeight)} pounds`}
                        onChange={(event) => setLaneWeight(Number(event.target.value))}
                      />
                    </div>
                    <p className="channel__scale" aria-hidden="true">
                      {ESTIMATOR_LIMITS.weight.ticks.map((tick) => <span key={tick}>{tick}</span>)}
                    </p>
                  </div>

                  <fieldset className="console__group">
                    <legend className="console__group-label">Equipment</legend>
                    <div className="seg">
                      {ESTIMATOR_EQUIPMENT.map((item) => (
                        <label className="seg__key" key={item.id}>
                          <input
                            className="seg__input"
                            type="radio"
                            name="ldn-equipment"
                            value={item.id}
                            checked={laneEquipment === item.id}
                            onChange={() => setLaneEquipment(item.id)}
                          />
                          <span className="seg__face">
                            <span className="seg__code" aria-hidden="true">{item.code}</span>
                            <span className="seg__name">{item.label}</span>
                            <span className="seg__meta" aria-hidden="true">&#215;{item.rate.toFixed(2)}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="console__group">
                    <legend className="console__group-label">Service level</legend>
                    <div className="seg">
                      {ESTIMATOR_SERVICE.map((item) => (
                        <label className="seg__key" key={item.id}>
                          <input
                            className="seg__input"
                            type="radio"
                            name="ldn-service"
                            value={item.id}
                            checked={laneService === item.id}
                            onChange={() => setLaneService(item.id)}
                          />
                          <span className="seg__face">
                            <span className="seg__code" aria-hidden="true">{item.code}</span>
                            <span className="seg__name">{item.label}</span>
                            <span className="seg__meta" aria-hidden="true">{item.pickup}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="console__group console__group--wide">
                    <legend className="console__group-label">Accessorials</legend>
                    <div className="toggles">
                      {ESTIMATOR_ACCESSORIALS.map((item) => (
                        <label className="toggle" key={item.id}>
                          <input
                            className="toggle__input"
                            type="checkbox"
                            checked={laneAccessorials[item.id]}
                            onChange={() => toggleAccessorial(item.id)}
                          />
                          <span className="toggle__face">
                            <span className="toggle__led" aria-hidden="true" />
                            <span className="toggle__body">
                              <span className="toggle__name">{item.label}</span>
                              <span className="toggle__detail">{item.detail}</span>
                            </span>
                            <span className="toggle__cost">
                              {`+$${formatFigure(item.flat + item.perMile * laneMiles)}`}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="console__bank console__bank--output">
                  <div className="console__bank-head">
                    <h3 className="console__bank-title">Output bank</h3>
                    <span className="console__bank-meta">RECALCULATED LIVE</span>
                  </div>

                  <p className="sr-only" role="status" aria-live="polite">{laneSummary}</p>

                  <div className="readout">
                    <div className="readout__head">
                      <p className="readout__label">Indicative rate band</p>
                      <span className="readout__tag" aria-hidden="true">
                        &#177;{Math.round(estimate.spread * 100)}%
                      </span>
                    </div>
                    <p className="band__figure">
                      <span className="band__currency" aria-hidden="true">US$</span>
                      <span className="band__value" ref={rateLowRef} aria-hidden="true" />
                      <span className="band__dash" aria-hidden="true">&#8211;</span>
                      <span className="band__value" ref={rateHighRef} aria-hidden="true" />
                      <span className="sr-only">
                        {`US$ ${formatFigure(estimate.rateLow)} to US$ ${formatFigure(estimate.rateHigh)}, plus or minus ${Math.round(estimate.spread * 100)} percent`}
                      </span>
                    </p>
                  </div>

                  <div className="meter">
                    <div className="meter__head">
                      <p className="meter__label">Rate per mile, against market scale</p>
                      <span className="meter__caption" aria-hidden="true">LOG US$1 &#8211; US$24 / MI</span>
                    </div>
                    <div
                      className="meter__track"
                      aria-hidden="true"
                      style={{
                        "--band-left": `${logPercentOf(estimate.perMileLow, ESTIMATOR_METER_FLOOR, ESTIMATOR_METER_CEIL)}%`,
                        "--band-right": `${100 - logPercentOf(estimate.perMileHigh, ESTIMATOR_METER_FLOOR, ESTIMATOR_METER_CEIL)}%`,
                        "--needle": `${logPercentOf(estimate.perMile, ESTIMATOR_METER_FLOOR, ESTIMATOR_METER_CEIL)}%`,
                      }}
                    >
                      <span className="meter__band" />
                      <span className="meter__needle" />
                    </div>
                    <p className="meter__scale" aria-hidden="true">
                      {ESTIMATOR_METER_TICKS.map((tick) => (
                        <span
                          key={tick}
                          style={{
                            "--at": `${logPercentOf(tick, ESTIMATOR_METER_FLOOR, ESTIMATOR_METER_CEIL)}%`,
                          }}
                        >
                          {tick.toFixed(2)}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div className="tiles">
                    <div className="tile">
                      <p className="tile__label">Rate / mile</p>
                      <p className="tile__value">
                        <span className="tile__prefix" aria-hidden="true">US$</span>
                        <span className="tile__figure" ref={rateMileRef} aria-hidden="true" />
                        <span className="sr-only">{`US$ ${estimate.perMile.toFixed(2)} per mile`}</span>
                      </p>
                      <p className="tile__sub">
                        {`${estimate.perMileLow.toFixed(2)} to ${estimate.perMileHigh.toFixed(2)} across band`}
                      </p>
                    </div>
                    <div className="tile">
                      <p className="tile__label">Transit window</p>
                      <p className="tile__value">
                        <span className="tile__figure">
                          {estimate.transitLow === estimate.transitHigh
                            ? estimate.transitLow
                            : `${estimate.transitLow}–${estimate.transitHigh}`}
                        </span>
                        <span className="tile__unit">DAYS</span>
                      </p>
                      <p className="tile__sub">
                        {`${formatFigure(estimate.service.milesPerDay * (laneAccessorials.team ? 1.8 : 1))} mi per day pace`}
                      </p>
                    </div>
                    <div className="tile">
                      <p className="tile__label">Pickup window</p>
                      <p className="tile__value">
                        <span className="tile__figure tile__figure--short">{estimate.service.pickup}</span>
                      </p>
                      <p className="tile__sub">
                        {`From confirmed details, ${estimate.service.label.toLowerCase()}`}
                      </p>
                    </div>
                  </div>

                  <div className="gauge">
                    <div className="gauge__head">
                      <p className="gauge__label">Payload load factor</p>
                      <p className="gauge__value">
                        {Math.round(estimate.loadFactor * 100)}
                        <span aria-hidden="true">%</span>
                        <span className="sr-only"> percent of payload</span>
                      </p>
                    </div>
                    <div
                      className="gauge__bar"
                      aria-hidden="true"
                      style={{
                        "--fill": `${Math.min(100, (estimate.loadFactor / ESTIMATOR_GAUGE_SPAN) * 100)}%`,
                        "--redline": `${(1 / ESTIMATOR_GAUGE_SPAN) * 100}%`,
                      }}
                    >
                      <span className="gauge__bar-fill" />
                      <span className="gauge__redline" />
                    </div>
                    <p className="gauge__scale" aria-hidden="true">
                      <span>0 LB</span>
                      <span>REDLINE {formatFigure(estimate.equipment.payload)} LB</span>
                    </p>
                  </div>

                  <table className="ledger">
                    <caption className="ledger__caption">Rate build</caption>
                    <thead>
                      <tr>
                        <th scope="col">Line</th>
                        <th scope="col">Basis</th>
                        <th scope="col">US$</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Base rate</th>
                        <td className="ledger__note">TAPER f({formatFigure(estimate.miles)} MI)</td>
                        <td className="ledger__figure">{estimate.baseRate.toFixed(2)} / MI</td>
                      </tr>
                      <tr>
                        <th scope="row">Equipment</th>
                        <td className="ledger__note">{estimate.equipment.code}</td>
                        <td className="ledger__figure">&#215;{estimate.equipment.rate.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Service level</th>
                        <td className="ledger__note">{estimate.service.code}</td>
                        <td className="ledger__figure">&#215;{estimate.service.rate.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Weight</th>
                        <td className="ledger__note">{formatFigure(estimate.weight)} LB</td>
                        <td className="ledger__figure">&#215;{estimate.weightFactor.toFixed(3)}</td>
                      </tr>
                      <tr className="ledger__row--split">
                        <th scope="row">Linehaul</th>
                        <td className="ledger__note">
                          {formatFigure(estimate.miles)} MI &#215; {estimate.loadedRate.toFixed(2)}
                        </td>
                        <td className="ledger__figure">{formatFigure(estimate.linehaul)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Fuel surcharge</th>
                        <td className="ledger__note">
                          {formatFigure(estimate.miles)} MI &#215; {estimate.equipment.fuel.toFixed(2)}
                        </td>
                        <td className="ledger__figure">{formatFigure(estimate.fuel)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Accessorials</th>
                        <td className="ledger__note">
                          {estimate.active.length
                            ? estimate.active.map((item) => item.code).join(" + ")
                            : "NONE"}
                        </td>
                        <td className="ledger__figure">{formatFigure(estimate.accessorialTotal)}</td>
                      </tr>
                      {estimate.floorAdjustment > 0 && (
                        <tr>
                          <th scope="row">Minimum charge</th>
                          <td className="ledger__note">FLOOR {formatFigure(ESTIMATOR_MIN_CHARGE)}</td>
                          <td className="ledger__figure">{formatFigure(estimate.floorAdjustment)}</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th scope="row">Indicative mid</th>
                        <td className="ledger__note">SPREAD &#177;{Math.round(estimate.spread * 100)}%</td>
                        <td className="ledger__figure">{formatFigure(estimate.mid)}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="lamps">
                    <p className="lamps__label" id="ldn-lamps-label">Status</p>
                    <ul className="lamps__list" aria-labelledby="ldn-lamps-label">
                      {estimate.lamps.map((lamp) => (
                        <li className={`lamp${lamp.on ? " is-on" : ""}`} key={lamp.code}>
                          <span className="lamp__led" aria-hidden="true" />
                          <span className="lamp__code" aria-hidden="true">{lamp.code}</span>
                          <span className="sr-only">
                            {`${lamp.label}: ${lamp.on ? "active" : "clear"}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="fit">
                    <p className="fit__label">Fit note</p>
                    <p className="fit__text">{estimate.fit}</p>
                  </div>
                </div>
              </div>

              <p className="console__disclaimer">
                <span className="console__disclaimer-chip">Indicative only</span>
                <span>
                  A modelled figure, not a quote and not a binding rate. Real pricing moves with live capacity, appointment times, accessorial detail and what equipment is actually available on the day. Send the lane over and we will price it properly.
                </span>
              </p>
            </div>

            <p className="estimator__footnote">
              <span>NEXT</span>
              <a className="text-link text-link--forest" href="#quote">
                Put this lane in front of a broker <Arrow diagonal />
              </a>
            </p>
          </div>
        </section>

        <section className="tracker" id="tracking" ref={trackerRef}>
          <div className="section-wrap">
            <div className="tracker__head">
              <div className="section-index section-index--light" data-reveal>
                <span>04</span>
                <p>Load in motion</p>
              </div>
              <h2 data-reveal>Watch a load<br />move, <em>mile by mile.</em></h2>
              <div className="tracker__intro" data-reveal>
                <p>
                  Run a sample Dallas to Chicago load end to end. The route, the timestamps, the
                  checkpoint notes—this is the picture your London Trucking coordinator works from
                  when you call for an update.
                </p>
                <p className="tracker__disclaimer">
                  <span>Demonstration</span> LDN-77413 is a scripted sample load. No live carrier
                  data is shown, stored, or transmitted.
                </p>
              </div>
            </div>

            <div className="tracker__console" data-reveal>
              <div className="tracker__stage">
                <div className="tracker__stage-top">
                  <span>LOAD LDN-77413 / DEMO PLAYBACK</span>
                  <span className="live-label"><i /> SIMULATED FEED</span>
                </div>

                <div className="tracker__map" ref={trackMapRef}>
                  <div className="tracker__plot">
                    <svg className="tracker__map-svg" viewBox="0 0 1000 560" aria-hidden="true">
                      <defs>
                        <pattern id="tracker-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M50 0H0V50" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect className="tracker__grid" width="1000" height="560" fill="url(#tracker-grid)" />

                      <path className="tracker__corridor" d={trackerRoutePath} />
                      <path className="tracker__corridor-dash" d={trackerRoutePath} />
                      <path className="tracker__traveled" d={trackTraveled} />

                      <g className="tracker__compass" transform="translate(52 66)">
                        <path d="M0-28 9 9 0 1-9 9Z" />
                        <text y="30">N</text>
                      </g>

                      <g className="tracker__scale" transform="translate(744 512)">
                        <path d="M0 0h190M0-7v14M95-4v8M190-7v14" />
                        <text y="-14">0</text>
                        <text x="190" y="-14">250 MI</text>
                      </g>

                      <g
                        className="tracker__truck"
                        transform={`translate(${trackRead.point[0].toFixed(2)} ${trackRead.point[1].toFixed(2)}) rotate(${trackRead.heading.toFixed(2)})`}
                      >
                        <circle className="tracker__truck-halo" r="27" />
                        <rect className="tracker__truck-body" x="-24" y="-9" width="34" height="18" rx="1.5" />
                        <path className="tracker__truck-cab" d="M12-9h8l6 7v11h-14Z" />
                        <path className="tracker__truck-ink" d="M-18-3h22" />
                        <circle className="tracker__truck-wheel" cx="-16" cy="10" r="3.2" />
                        <circle className="tracker__truck-wheel" cx="2" cy="10" r="3.2" />
                        <circle className="tracker__truck-wheel" cx="18" cy="10" r="3.2" />
                      </g>
                    </svg>

                    <div
                      className="tracker__nodes"
                      role="toolbar"
                      aria-label="Route milestones"
                      aria-orientation="horizontal"
                    >
                      {trackerMilestones.map((milestone, index) => {
                        const edge =
                          index === 0
                            ? " tracker__node--start"
                            : index === trackerMilestones.length - 1
                              ? " tracker__node--end"
                              : "";
                        const state =
                          index < trackRead.index
                            ? " is-passed"
                            : index === trackRead.index
                              ? " is-current"
                              : "";

                        return (
                          <button
                            className={`tracker__node${edge}${state}`}
                            type="button"
                            key={milestone.code}
                            ref={(node) => {
                              trackNodeRefs.current[index] = node;
                            }}
                            style={{
                              left: `${(milestone.point[0] / TRACK_VIEW.w) * 100}%`,
                              top: `${(milestone.point[1] / TRACK_VIEW.h) * 100}%`,
                            }}
                            tabIndex={index === trackFocusIndex ? 0 : -1}
                            aria-pressed={index === trackRead.index}
                            onClick={() => glideToMilestone(index)}
                            onKeyDown={(event) => handleTrackNodeKeys(event, index)}
                          >
                            <span className="tracker__node-ring" aria-hidden="true" />
                            <span className="tracker__node-dot" aria-hidden="true" />
                            <span className="tracker__node-code" aria-hidden="true">{milestone.code}</span>
                            <span className="tracker__node-name" aria-hidden="true">{milestone.status}</span>
                            <span className="sr-only">
                              {`Stage ${milestone.code} of 07, ${milestone.status}, ${milestone.place}, ${formatTrackClock(milestone.hour)}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <p className="tracker__coord" aria-hidden="true">{formatTrackCoord(trackRead.coord)}</p>
                  </div>
                </div>

                <div className="tracker__stage-foot">
                  <span>ORIGIN / DALLAS, TX</span>
                  <span>925 MI CORRIDOR</span>
                  <span>DEST / CHICAGO, IL</span>
                </div>

                <div className="tracker__transport">
                  <div className="tracker__keys">
                    <button
                      className="tracker__key"
                      type="button"
                      onClick={handleTrackPrev}
                      aria-disabled={trackRead.position <= 0}
                      aria-label="Previous milestone"
                    >
                      <svg className="tracker__key-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18 4v16l-11-8ZM6 4h2.4v16H6Z" />
                      </svg>
                    </button>

                    <button className="tracker__key tracker__key--play" type="button" onClick={toggleTrackPlay}>
                      <svg className="tracker__key-icon" viewBox="0 0 24 24" aria-hidden="true">
                        {trackPlaying ? (
                          <path d="M6.5 4h4v16h-4ZM13.5 4h4v16h-4Z" />
                        ) : (
                          <path d="M7 4 19 12 7 20Z" />
                        )}
                      </svg>
                      <span>{trackPlayLabel}</span>
                    </button>

                    <button
                      className="tracker__key"
                      type="button"
                      onClick={handleTrackNext}
                      aria-disabled={trackAtEnd}
                      aria-label="Next milestone"
                    >
                      <svg className="tracker__key-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 4v16l11-8ZM15.6 4H18v16h-2.4Z" />
                      </svg>
                    </button>

                    <button
                      className="tracker__key"
                      type="button"
                      onClick={handleTrackRestart}
                      aria-label="Restart demo playback"
                    >
                      <svg className="tracker__key-icon tracker__key-icon--stroke" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 12a8 8 0 1 1-2.4-5.7M20 3.5V9h-5.5" />
                      </svg>
                    </button>
                  </div>

                  <div className="tracker__scrub">
                    <label className="sr-only" htmlFor="tracker-scrub">
                      Scrub the demo shipment along its route
                    </label>
                    <input
                      className="tracker__scrub-input"
                      id="tracker-scrub"
                      type="range"
                      min="0"
                      max={TRACK_MAX}
                      step="5"
                      value={Math.round(trackRead.position)}
                      onChange={handleTrackScrub}
                      style={{ "--scrub": `${trackRead.progress * 100}%` }}
                      aria-valuetext={trackScrubText}
                    />
                    <div className="tracker__scrub-ticks" aria-hidden="true">
                      {trackerMilestones.map((milestone, index) => (
                        <span
                          className={`tracker__tick${index <= trackRead.index ? " is-done" : ""}`}
                          key={milestone.code}
                          style={{ left: `${(index / trackerLegs.length) * 100}%` }}
                        >
                          {milestone.code}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="tracker__speed" role="group" aria-label="Playback speed">
                    {TRACK_SPEEDS.map((speed) => (
                      <button
                        className={`tracker__speed-button${trackSpeed === speed ? " is-active" : ""}`}
                        type="button"
                        key={speed}
                        aria-pressed={trackSpeed === speed}
                        onClick={() => setTrackSpeed(speed)}
                      >
                        <span aria-hidden="true">×{speed}</span>
                        <span className="sr-only">{`${speed} times playback speed`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="tracker__readout">
                <div className="tracker__readout-top">
                  <span>Status board</span>
                  <span className={`tracker__state${trackAtEnd ? " is-complete" : ""}`}>{trackStateLabel}</span>
                </div>

                <div className="tracker__phase" aria-live="polite" ref={trackPhaseRef}>
                  <span className="tracker__phase-code">Stage {trackRead.current.code} / 07</span>
                  <h3 className="tracker__phase-title">{trackRead.current.status}</h3>
                  <p className="tracker__phase-place">{trackRead.current.place}</p>
                  <p className="tracker__phase-note">{trackRead.current.detail}</p>
                  <p className="sr-only">
                    {`Logged ${formatTrackClock(trackRead.current.hour)}, ${formatTrackMiles(trackRead.current.mile)} miles run.`}
                  </p>
                </div>

                <dl className="tracker__meters">
                  <div className="tracker__meter">
                    <dt className="tracker__meter-label">Route clock</dt>
                    <dd className="tracker__meter-value">{formatTrackClock(trackRead.hours)}</dd>
                  </div>
                  <div className="tracker__meter">
                    <dt className="tracker__meter-label">Elapsed</dt>
                    <dd className="tracker__meter-value">{formatTrackElapsed(trackRead.hours)}</dd>
                  </div>
                  <div className="tracker__meter">
                    <dt className="tracker__meter-label">Miles run</dt>
                    <dd className="tracker__meter-value">{formatTrackMiles(trackRead.miles)}</dd>
                  </div>
                  <div className="tracker__meter">
                    <dt className="tracker__meter-label">Miles left</dt>
                    <dd className="tracker__meter-value">{formatTrackMiles(trackRead.milesLeft)}</dd>
                  </div>
                </dl>

                <p className="tracker__next">
                  <span className="tracker__next-label">{trackRead.next ? "Next stage" : "Load closed"}</span>
                  <span className="tracker__next-value">
                    {trackRead.next
                      ? `${trackRead.next.status} — ETA ${formatTrackClock(trackRead.next.hour)}`
                      : `Signed ${formatTrackClock(trackRead.current.hour)}`}
                  </span>
                </p>

                <div className="tracker__progress">
                  <div className="tracker__progress-bar" aria-hidden="true">
                    <span
                      className="tracker__progress-fill"
                      style={{ transform: `scaleX(${trackRead.progress})` }}
                    />
                  </div>
                  <span className="tracker__progress-figure" aria-hidden="true">
                    {Math.round(trackRead.progress * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <p className="availability-note tracker__foot">
              <span>NOTE</span> Scripted demonstration only. Real shipment updates come from the
              carrier and your London Trucking coordinator at the intervals agreed for the lane.
            </p>
          </div>
        </section>

        <section className="process" id="process">
          <div className="process-backdrop" data-parallax="-10">MOVE</div>
          <div className="section-wrap">
            <div className="process-heading">
              <div className="section-index" data-reveal>
                <span>05</span>
                <p>How it moves</p>
              </div>
              <h2 data-reveal>Details in.<br /><em>Freight out.</em></h2>
              <p data-reveal>A direct process built to keep the work visible and the next step clear.</p>
            </div>

            <div className="process-steps">
              <div className="process-line" aria-hidden="true"><span className="process-line__fill" /></div>
              {processSteps.map((step) => (
                <article className="process-step" key={step.code}>
                  <div className="process-step__node"><span>{step.code}</span></div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="why" id="why">
          <div className="section-wrap">
            <h2 className="sr-only">Why London Trucking</h2>
            <div className="why-head">
              <div className="section-index" data-reveal>
                <span>06</span>
                <p>Built for clarity</p>
              </div>
              <p data-reveal>THE LONDON TRUCKING APPROACH</p>
            </div>

            <div className="why-statement">
              <div className="why-statement__line" />
              <article data-reveal>
                <span>01</span>
                <h3>Responsive by design</h3>
                <p>Communication stays direct, useful, and tied to the shipment decision in front of you.</p>
              </article>
              <article data-reveal>
                <span>02</span>
                <h3>Capacity matched carefully</h3>
                <p>Carrier and equipment options are considered against the lane and load requirements.</p>
              </article>
              <article data-reveal>
                <span>03</span>
                <h3>Visibility at every handoff</h3>
                <p>Pickup, transit, delivery, and closeout are treated as one coordinated movement.</p>
              </article>
            </div>

            <div className="why-closing" data-reveal>
              <span className="why-closing__eyebrow">CLEAR ROUTES / STRONG CONNECTIONS</span>
              <p>
                Brokerage should make complexity feel lighter—not add another layer to manage.
              </p>
              <div className="why-seal" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <path id="seal-path" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" fill="none" />
                  <text><textPath href="#seal-path">LONDON TRUCKING • FREIGHT BROKERAGE • </textPath></text>
                  <path d="M33 42h54M40 43l20 39 20-39" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="quote" id="quote">
          <div className="quote-route" aria-hidden="true">
            <span />
            <i />
          </div>
          <div className="section-wrap quote-grid">
            <div className="quote-copy">
              <div className="section-index section-index--dark" data-reveal>
                <span>07</span>
                <p>Ready when your freight is</p>
              </div>
              <h2 data-reveal>Let’s get your<br />next load <em>moving.</em></h2>
              <p data-reveal>
                Give us the shipment essentials and create a clean load brief for your London Trucking contact.
              </p>
              <div className="quote-checklist" data-reveal>
                <span>ORIGIN + DESTINATION</span>
                <span>FREIGHT + EQUIPMENT</span>
                <span>READY DATE + TIMING</span>
              </div>
            </div>

            <form className="quote-form" onSubmit={handleQuote} onChange={clearPreparedBrief} data-reveal>
              <div className="form-heading">
                <span>LOAD BRIEF / 01</span>
                <span>REQUIRED FIELDS *</span>
              </div>

              <div className="form-row">
                <label>
                  <span>Your name *</span>
                  <input name="name" type="text" autoComplete="name" placeholder="Full name" required />
                </label>
                <label>
                  <span>Company</span>
                  <input name="company" type="text" autoComplete="organization" placeholder="Company name" />
                </label>
              </div>

              <label>
                <span>Work email *</span>
                <input name="email" type="email" autoComplete="email" placeholder="name@company.com" required />
              </label>

              <div className="form-row">
                <label>
                  <span>Origin *</span>
                  <input name="origin" type="text" placeholder="City, State" required />
                </label>
                <label>
                  <span>Destination *</span>
                  <input name="destination" type="text" placeholder="City, State" required />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Freight type *</span>
                  <select name="freight" defaultValue="" required>
                    <option value="" disabled>Select a mode</option>
                    <option>Full truckload</option>
                    <option>Partial / LTL</option>
                    <option>Expedited freight</option>
                    <option>Recurring / multi-stop</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label>
                  <span>Ready date</span>
                  <input name="date" type="date" />
                </label>
              </div>

              <button className="button button--dark form-submit" type="submit">
                <span>Prepare load brief</span>
                <Arrow />
              </button>
              <p className="form-note">
                Your details stay in your browser. Prepare the brief, then copy or download it for your freight inquiry.
              </p>
              <p className="form-status" role="status" aria-live="polite">{quoteStatus}</p>
              {quoteBrief && (
                <div className="quote-result">
                  <div className="quote-result__heading">
                    <span>PREPARED LOAD BRIEF</span>
                    <span className="quote-result__actions">
                      <button type="button" onClick={copyQuoteBrief}>Copy</button>
                      <button type="button" onClick={downloadQuoteBrief}>Download</button>
                    </span>
                  </div>
                  <textarea value={quoteBrief} readOnly aria-label="Prepared freight quote brief" rows="10" />
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <Logo />
          <p>Clear coordination.<br />Confident movement.</p>
          <a className="footer-up" href="#top" aria-label="Back to top">↑</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} London Trucking</span>
          <span>GENERAL FREIGHT BROKERAGE</span>
          <span>Brokerage services subject to carrier availability and agreed shipment terms.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
