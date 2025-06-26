import { forwardRef, useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-toastify';

const Contact = forwardRef<HTMLDivElement, { scrollPos: number }>(
    ({ scrollPos }, ref) => {
        const [form, setForm] = useState({ name: '', email: '', message: '' });
        const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

        const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setForm(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
            setStatus('submitting');
            const data = new FormData();
            data.append('name', form.name);
            data.append('email', form.email);
            data.append('message', form.message);

            try {
                const res = await fetch('https://formspree.io/f/mvgaldeb', {
                    method: 'POST', body: data,
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) throw new Error('Form submit failed');
                setStatus('success');
                toast.success('Message sent successfully');
            } catch {
                setStatus('error');
                toast.error('Failed to send message');
            } finally {
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            }
        };

        useEffect(() => {
            const formEl = document.getElementById('tilt-form');
            if (!formEl) return;

            const handleMouseMove = (e: MouseEvent) => {
                const r = formEl.getBoundingClientRect(),
                    x = e.clientX - r.left,
                    y = e.clientY - r.top,
                    cx = r.width / 2,
                    cy = r.height / 2,
                    rotX = -(y - cy) / 20,
                    rotY = (x - cx) / 20;

                formEl.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;

                // Glare
                const glare = document.getElementById('glare-layer');
                if (glare) {
                    const px = (x / r.width - 0.5) * 2,
                        py = (y / r.height - 0.5) * 2;
                    glare.style.transform = `translate(${px * 20}px, ${py * 20}px)`;
                }
            };

            const reset = () => {
                formEl.style.transform = 'rotateX(0) rotateY(0) scale(1)';
                const glare = document.getElementById('glare-layer');
                if (glare) glare.style.transform = 'translate(0,0)';
            };

            formEl.addEventListener('mousemove', handleMouseMove);
            formEl.addEventListener('mouseleave', reset);
            return () => {
                formEl.removeEventListener('mousemove', handleMouseMove);
                formEl.removeEventListener('mouseleave', reset);
            };
        }, []);

        return (
            <div ref={ref} className="py-12 bg-[url('coffee.jpeg')] bg-cover bg-center">
                <div className="mt-5 flex justify-center">
                    <div className="relative [perspective:1000px] group w-full max-w-[600px]">
                        <div
                            id="tilt-form"
                            className={`relative [transform-style:preserve-3d] transition-transform duration-300 ease-linear 
                bg-white/10 backdrop-blur-lg p-10 rounded-xl shadow-[0_0_60px_rgba(255,255,255,0.2)] border border-white/30 overflow-hidden
                ${scrollPos > 5100 ? 'animate-[appearFromBottom_1s_ease-in-out]'
                                    : scrollPos > 2740 ? 'md:animate-[appearFromTop_1s_ease-in-out]'
                                        : ''}`}
                        >
                            {/* Glare overlay */}
                            <div
                                id="glare-layer"
                                className="absolute inset-0 pointer-events-none bg-white/20 blur-xl opacity-10"
                            />

                            <h1 className="text-2xl font-semibold mb-6 text-white text-center">Connect with Me</h1>

                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                {['name', 'email', 'message'].map((field, idx) => (
                                    <div key={field} className="relative group">
                                        <input
                                            id={field}
                                            name={field}
                                            value={form[field as keyof typeof form]}
                                            onChange={handleChange}
                                            required
                                            type={field === 'email' ? 'email' : 'text'}
                                            className="peer w-full p-3 bg-white/20 text-white border border-white/30 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                            placeholder={field}
                                            style={{ minHeight: field === 'message' ? '120px' : 'auto' }}
                                        />
                                    </div>
                                ))}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="bg-cyan-600 hover:bg-cyan-700 transition-colors p-3 rounded-md text-white font-semibold mt-4"
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Submit'}
                                </button>

                                {status === 'success' && <p className="text-green-300 text-center mt-2">✅ Message sent!</p>}
                                {status === 'error' && <p className="text-red-300 text-center mt-2">❌ Something went wrong.</p>}
                            </form>

                            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/30 to-pink-500/20 rounded-xl blur-2xl opacity-30 pointer-events-none z-[-1]" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default Contact;
