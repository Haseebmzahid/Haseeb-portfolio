"use client";
import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Activity,
  ArrowUpRight,
  Check,
  Layers3,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useInView } from "framer-motion";
import { useMedia, useSceneMotion } from "./MotionProvider";
import SceneBoundary from "./SceneBoundary";
import type { Project } from "@/constants/projects.data";

const ProductScene = dynamic(() => import("./ProductScene"), { ssr: false });
const slots = ["10:30", "11:00", "14:00"];
const routing = ["Message", "Understand", "Availability", "Record", "Confirm"];

function AppointmentDemo({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) {
  const [channel, setChannel] = useState("WhatsApp");
  const [urdu, setUrdu] = useState(false);
  const [selected, setSelected] = useState(slots[0]);
  const [reserved, setReserved] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState("");
  const available = slots.filter((s) => !reserved.includes(s));
  function reserve() {
    if (!available.includes(selected)) return;
    const nextReserved = [...reserved, selected];
    setReserved(nextReserved);
    setConfirmation(`${selected} reserved in this demo.`);
    setSelected(slots.find((s) => !nextReserved.includes(s)) ?? "");
    setStep(4);
  }
  return (
    <div className="appointment-demo">
      <div className="channel-tabs" aria-label="Example message channel">
        {["WhatsApp", "Instagram", "Messenger"].map((c) => (
          <button
            key={c}
            aria-pressed={channel === c}
            onClick={() => {
              setChannel(c);
              setStep(0);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="conversation-heading">
        <span>
          <MessageCircle size={14} /> Patient conversation
        </span>
        <div className="language-switch">
          <button
            aria-label="Show English conversation"
            aria-pressed={!urdu}
            onClick={() => setUrdu(false)}
          >
            EN
          </button>
          <button
            aria-label="Show Urdu conversation"
            aria-pressed={urdu}
            onClick={() => setUrdu(true)}
            lang="ur"
          >
            اردو
          </button>
        </div>
      </div>
      <div
        className="message-bubble patient"
        lang={urdu ? "ur" : "en"}
        dir={urdu ? "rtl" : "ltr"}
      >
        {urdu
          ? "کیا کل ملاقات کا وقت مل سکتا ہے؟"
          : "Can I book a visit tomorrow?"}
        <small>{channel} / Sample conversation</small>
      </div>
      <div
        className="message-bubble agent"
        lang={urdu ? "ur" : "en"}
        dir={urdu ? "rtl" : "ltr"}
      >
        <span className="agent-signature">
          <Layers3 size={12} /> Meta Suite Agent
        </span>
        {urdu
          ? "جی ہاں، میں دستیاب اوقات دیکھ رہا ہوں۔"
          : "Of course. Let me check the next available appointment."}
      </div>
      <div className="availability-panel">
        <div>
          <span>AVAILABLE SLOTS</span>
          <small>{available.length} remaining in demo</small>
        </div>
        <div className="slot-options" aria-label="Sample appointment slots">
          {slots.map((s) => (
            <button
              key={s}
              disabled={reserved.includes(s)}
              aria-pressed={selected === s}
              onClick={() => {
                setSelected(s);
                setStep(2);
              }}
            >
              {reserved.includes(s) ? <Check size={12} /> : null}
              {s}
            </button>
          ))}
        </div>
        <button
          className="reserve-slot"
          disabled={!available.length}
          onClick={reserve}
        >
          {available.length
            ? "Reserve sample slot"
            : "All sample slots reserved"}
          <ArrowUpRight size={13} />
        </button>
        <p className="reservation-feedback" aria-live="polite">
          {confirmation
            ? `${confirmation} ${available.length ? `Next available: ${available[0]}.` : "No slots remain."}`
            : "Availability → appointment record → confirmation"}
        </p>
      </div>
      <span className="demo-stage-name">
        STEP 0{step + 1} / {routing[step]}
      </span>
    </div>
  );
}

export default function ProductShowcase({ project }: { project: Project }) {
  const [view, setView] = useState(0);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const desktop = useMedia("(min-width: 769px)");
  const moving = useSceneMotion();
  const onReady = useCallback(() => setReady(true), []);
  const health = project.kind === "health";
  const agent = project.kind === "agent";
  const screen = health
    ? `/displays/foreseeme-phone-${view}.svg`
    : "/displays/finflow-capture.jpeg";
  const fallback = agent ? (
    <div className="agent-path-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  ) : (
    <div className={`product-phone-fallback ${!health ? "capture-phone" : ""}`}>
      {!health ? (
        <div className="capture-window">
          <Image
            src="/displays/finflow-capture.jpeg"
            fill
            sizes="230px"
            alt={`Actual FinFlow ${view === 0 ? "market overview" : view === 1 ? "candlestick chart" : "AI analyst"} captured in January 2026`}
            style={{
              objectFit: "cover",
              objectPosition:
                view === 0
                  ? "center center"
                  : view === 1
                    ? "center bottom"
                    : "center top",
            }}
          />
        </div>
      ) : (
        <>
          <Image
            src={screen}
            width={390}
            height={844}
            alt={`${project.title} ${view === 0 ? "overview" : "intelligence"} illustrative mobile screen`}
          />
        </>
      )}
      <span className="phone-camera" />
    </div>
  );
  return (
    <div
      ref={ref}
      className={`product-visual product-${project.kind}`}
      data-product={project.id}
      data-view={view}
      data-step={step}
      data-scene-ready={ready}
    >
      <div className="product-engraving">
        HZ / PRODUCT ENGINEERING{" "}
        <span>
          {project.kind === "mobile"
            ? "FLUTTER × GEMINI"
            : health
              ? "HEALTH × CONTEXT"
              : "CONVERSATION × AUTOMATION"}
        </span>
      </div>
      <div className="product-art-copy">
        <span className="product-brand">
          {agent ? (
            <Layers3 size={20} />
          ) : health ? (
            <Activity size={20} />
          ) : (
            <ShieldCheck size={20} />
          )}{" "}
          {project.title.replace(" — AI Crypto Sentinel", "")}
        </span>
        <h4>
          {health ? (
            <>
              Health, with
              <br />
              <em>foresight.</em>
            </>
          ) : agent ? (
            <>
              One conversation.
              <br />
              <em>Everything connected.</em>
            </>
          ) : (
            <>
              Your market.
              <br />
              <em>In your pocket.</em>
            </>
          )}
        </h4>
        <p>
          {health
            ? "A little care, every day. Personal routines and environmental intelligence, brought into focus."
            : agent
              ? "Across channels. In their language. An agent that carries the conversation through to the appointment."
              : "A personalized mobile companion for a market that never stands still. Built around your perspective."}
        </p>
        {!agent && (
          <div
            className="product-view-controls"
            aria-label={`${project.title} interface view`}
          >
            {(health
              ? ["Medication routine", "Environmental context"]
              : ["Your market", "Interactive charts", "AI analyst"]
            ).map((label, i) => (
              <button
                key={label}
                onClick={() => setView(i)}
                aria-pressed={view === i}
              >
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight size={12} />
              </button>
            ))}
          </div>
        )}
        <div className="product-foundations">
          {health ? (
            <>
              <span>Flutter mobile client</span>
              <span>Python intelligence layer</span>
            </>
          ) : agent ? (
            <>
              <span>WhatsApp / Instagram / Messenger</span>
              <span>Gemini + appointment orchestration</span>
            </>
          ) : (
            <>
              <span>Flutter / Riverpod / Clean Architecture</span>
              <span>CoinGecko market data / Gemini AI</span>
            </>
          )}
        </div>
      </div>
      <div className="product-scene" aria-hidden="true">
        {desktop && visible ? (
          <SceneBoundary fallback={fallback}>
            <ProductScene
              variant={agent ? "agent" : health ? "health" : "mobile"}
              screen={screen}
              step={agent ? step : view}
              animate={visible && moving}
              onReady={onReady}
            />
          </SceneBoundary>
        ) : (
          fallback
        )}
        {desktop && visible && !ready && (
          <div className="product-scene-loading">{fallback}</div>
        )}
      </div>
      {agent ? (
        <>
          <AppointmentDemo step={step} setStep={setStep} />
          <div className="routing-controls" aria-label="Agent workflow stage">
            {routing.map((label, i) => (
              <button
                key={label}
                aria-pressed={step === i}
                onClick={() => setStep(i)}
              >
                <span>0{i + 1}</span>
                {label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="product-signal" key={view}>
          {health ? (
            <>
              <span className="signal-symbol">
                <Activity size={16} />
              </span>
              <div>
                <small>
                  {view === 0 ? "PERSONAL ROUTINE" : "ENVIRONMENTAL SIGNAL"}
                </small>
                <strong>
                  {view === 0
                    ? "The next reminder, in view."
                    : "Awareness begins with context."}
                </strong>
              </div>
            </>
          ) : (
            <>
              <span className="signal-symbol">
                <ShieldCheck size={16} />
              </span>
              <div>
                <small>
                  {view === 0
                    ? "PERSONALIZED TRACKING"
                    : view === 1
                      ? "TECHNICAL ANALYSIS"
                      : "CONTEXTUAL AI"}
                </small>
                <strong>
                  {view === 0
                    ? "Your assets. A focused view."
                    : view === 1
                      ? "A closer look at market movement."
                      : "Ask your market sentinel."}
                </strong>
              </div>
            </>
          )}
        </div>
      )}
      <span className="product-demo-caption">
        {agent
          ? "INTERACTIVE WORKFLOW STUDY / LOCAL DEMO / NO CLINIC CONNECTION"
          : health
            ? "ILLUSTRATIVE INTERFACE / NO LIVE HEALTH FEED"
            : "ACTUAL APP CAPTURE / JAN 2026 / HISTORICAL MARKET VALUES"}
      </span>
    </div>
  );
}
