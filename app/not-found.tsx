import Link from "next/link";

export default function NotFound() {
    return (
        <section className="min-h-screen flex items-center justify-center section-padding">
            <div className="text-center max-w-md mx-auto">
                <p className="text-8xl font-bold gradient-text mb-4">404</p>
                <h2 className="heading-lg mb-4">Page Not Found</h2>
                <p className="body-text mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </p>
                <Link href="/" className="btn-primary mx-auto">
                    Back to Home
                </Link>
            </div>
        </section>
    );
}
