import { forwardRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-toastify';

const Contact = forwardRef<HTMLDivElement>((_props, ref) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });

            if (res.ok) {
                setStatus('success');
                toast.success('Message sent successfully');
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Form submit failed');
            }
        } catch (err) {
            console.error(err)
            setStatus('error');
            toast.success('Message sent successfully');
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div ref={ref} className="py-12 bg-[url('coffee.jpeg')] bg-cover bg-center">
            <div className="mt-5 flex justify-center">
                <form className="flex flex-col gap-5 max-w-[600px] bg-[rgba(255,255,255,0.3)] rounded-lg p-10" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold mb-4 text-white">Connect with Me</h1>

                    <div className="flex justify-between items-center">
                        <label htmlFor="name" className="min-w-[100px] mr-5 text-white">Name</label>
                        <input
                            className="p-2 border border-gray-300 rounded w-full"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <label htmlFor="email" className="min-w-[100px] mr-5 text-white">Email</label>
                        <input
                            type="email"
                            className="p-2 border border-gray-300 rounded w-full"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-start">
                        <label htmlFor="message" className="min-w-[100px] mr-5 text-white">Message</label>
                        <textarea
                            className="p-2 border border-gray-300 rounded w-full min-h-[100px]"
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="bg-gray-500 hover:bg-gray-700 transition p-2 rounded-md w-[140px] mx-auto text-white"
                    >
                        {status === 'submitting' ? 'Sending...' : 'Submit'}
                    </button>

                    {status === 'success' && <p className="text-green-500 text-center">Message sent!</p>}
                    {status === 'error' && <p className="text-red-500 text-center">Something went wrong.</p>}
                </form>
            </div>
        </div>
    );
});

export default Contact;
