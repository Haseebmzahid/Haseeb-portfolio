"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { socialLinks } from "@/config/socials.config";
type FormStatus = "idle" | "loading" | "success" | "error";
interface FieldErrors {
  name?: string[];
  email?: string[];
  message?: string[];
}
export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setServerMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors({
            name: data.errors.name,
            email: data.errors.email,
            message: data.errors.message,
          });
        }
        setServerMessage(data.message || "Something went wrong.");
        setStatus("error");
        return;
      }

      setServerMessage(data.message);
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setServerMessage("Network error. Please check your connection.");
      setStatus("error");
    }
  }

  const isDisabled = status === "loading" || status === "success";
  return (
    <section id="contact" className="contact-section section-wrap">
      <p className="eyebrow">05 / THE NEXT CONVERSATION</p>
      <div className="contact-layout">
        <div className="contact-copy">
          <h2>
            Good software
            <br />
            starts with a<br />
            <em>conversation.</em>
          </h2>
          <p>
            Have a project in mind or want to collaborate? Drop me a message and
            I’ll get back to you as soon as possible.
          </p>
          <a className="contact-email" href="mailto:haseebg460@gmail.com">
            haseebg460@gmail.com <ArrowUpRight size={20} />
          </a>
          <div className="contact-availability">
            <i className="status-dot" />
            <span>Available for work</span>
          </div>
          <p className="availability-copy">
            Open to freelance projects, full-time roles and interesting
            collaboration opportunities. Typical response time: within 24 hours.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="contact-form"
          aria-label="Contact Haseeb"
        >
          <p className="eyebrow">TELL ME WHAT YOU’RE THINKING</p>
          <div className="form-field">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should I call you?"
              disabled={isDisabled}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name && (
              <p id="name-error" role="alert">
                {fieldErrors.name[0]}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isDisabled}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" role="alert">
                {fieldErrors.email[0]}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="message">A little about your idea</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="The challenge, the ambition, the possibilities…"
              rows={4}
              maxLength={2000}
              disabled={isDisabled}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={
                fieldErrors.message ? "message-error" : undefined
              }
            />
            <span className="character-count">{message.length} / 2000</span>
            {fieldErrors.message && (
              <p id="message-error" role="alert">
                {fieldErrors.message[0]}
              </p>
            )}
          </div>
          <button
            className="button-light submit-button"
            type="submit"
            disabled={isDisabled}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Sending…
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2 size={16} /> Message sent
              </>
            ) : (
              <>
                Send Message <ArrowRight size={17} />
              </>
            )}
          </button>
          <div
            aria-live="polite"
            aria-atomic="true"
            className={"form-feedback " + status}
          >
            {serverMessage}
          </div>
        </form>
      </div>
      <footer className="site-footer">
        <a href="#home" className="footer-name">
          Haseeb Zahid<span>SOFTWARE / SYSTEMS / POSSIBILITY</span>
        </a>
        <div>
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              {s.label}
              <ArrowUpRight size={12} />
            </a>
          ))}
        </div>
        <a href="#home" className="back-top">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
