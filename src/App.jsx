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

        <section className="process" id="process">
          <div className="process-backdrop" data-parallax="-10">MOVE</div>
          <div className="section-wrap">
            <div className="process-heading">
              <div className="section-index" data-reveal>
                <span>03</span>
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
                <span>04</span>
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
                <span>05</span>
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
