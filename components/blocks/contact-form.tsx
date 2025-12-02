'use client';

import React, { useState } from 'react';
import { Section } from '../layout/section';
import { tinaField } from 'tinacms/dist/react';
import type { Template } from 'tinacms';
import { PageBlocksContactForm } from '../../tina/__generated__/types';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const ContactForm = ({ data }: { data: PageBlocksContactForm }) => {
    const [formData, setFormData] = useState({
        appointmentType: 'appointment',
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const form = e.currentTarget;
            const formDataToSend = new FormData(form);

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formDataToSend as any).toString(),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    appointmentType: 'appointment',
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Section background={data.background!}>
            <div className="max-w-2xl mx-auto">
                {data.title && (
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 text-center mb-4" data-tina-field={tinaField(data, 'title')}>
                        {data.title}
                    </h2>
                )}
                {data.description && (
                    <p className="text-lg text-gray-600 text-center mb-8" data-tina-field={tinaField(data, 'description')}>
                        {data.description}
                    </p>
                )}

                <form
                    name="contact"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Appointment Type Selection */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Wat wilt u doen? <span className="text-orange-600">*</span>
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="appointmentType"
                                    value="appointment"
                                    checked={formData.appointmentType === 'appointment'}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                    required
                                />
                                <span className="ml-2 text-gray-700 group-hover:text-gray-900">Afspraak maken</span>
                            </label>
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="appointmentType"
                                    value="information"
                                    checked={formData.appointmentType === 'information'}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-gray-700 group-hover:text-gray-900">Informatie vragen</span>
                            </label>
                        </div>
                    </div>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Naam <span className="text-orange-600">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="Uw volledige naam"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mailadres <span className="text-orange-600">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="uw.email@voorbeeld.nl"
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Telefoonnummer <span className="text-orange-600">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="06-12345678"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Bericht <span className="text-orange-600">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                            placeholder={
                                formData.appointmentType === 'appointment'
                                    ? 'Beschrijf uw klachten en geef uw voorkeur voor een afspraak aan...'
                                    : 'Stel uw vraag...'
                            }
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-8 py-6 text-base rounded-full bg-orange-600 hover:bg-orange-700 text-white transition-all duration-150 ease-out hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                        </Button>
                    </div>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-green-800 text-center">
                                ✓ Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-800 text-center">
                                Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </Section>
    );
};

export const contactFormBlockSchema: Template = {
    name: 'contactForm',
    label: 'Contact Form',
    ui: {
        defaultItem: {
            title: 'Neem contact op',
            description: 'Vul het formulier in en we nemen zo spoedig mogelijk contact met u op.',
        },
    },
    fields: [
        {
            type: 'string' as const,
            label: 'Background',
            name: 'background',
            options: [
                { label: 'Default', value: 'bg-default' },
                { label: 'White', value: 'bg-white' },
                { label: 'Hero Layered', value: 'bg-hero-layered' },
            ],
        },
        {
            type: 'string' as const,
            label: 'Title',
            name: 'title',
        },
        {
            type: 'string' as const,
            label: 'Description',
            name: 'description',
            ui: {
                component: 'textarea',
            },
        },
    ],
};
