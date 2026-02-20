"use client";

import { motion } from "framer-motion";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <section className="min-h-screen flex items-center justify-center section-padding">
            <motion.div
                className="text-center max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-6xl mb-6">⚠️</p>
                <h2 className="heading-lg gradient-text mb-4">
                    Something went wrong
                </h2>
                <p className="body-text mb-8">
                    An unexpected error occurred. Please try again.
                </p>
                <button onClick={reset} className="btn-primary mx-auto">
                    Try Again
                </button>
            </motion.div>
        </section>
    );
}
