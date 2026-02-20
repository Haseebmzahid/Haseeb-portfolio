export default function Loading() {
    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-accent-indigo border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-fg-muted font-medium tracking-wide">
                    Loading...
                </p>
            </div>
        </section>
    );
}
