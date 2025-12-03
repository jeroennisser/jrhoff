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
        appointmentType: data.appointmentMode ? 'appointment' : 'information',
        treatmentType: 'free_intro',
        preferredTime: '',
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
            const formParams = new URLSearchParams();
            formParams.append('form-name', 'contact'); // Explicitly add form-name
            for (const pair of formDataToSend.entries()) {
                formParams.append(pair[0], pair[1] as string);
            }

            const response = await fetch('/__forms.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formParams.toString(),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    appointmentType: data.appointmentMode ? 'appointment' : 'information',
                    treatmentType: 'free_intro',
                    preferredTime: '',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Section background={data.background!} id="aanvraagformulier">
            <div className="max-w-2xl mx-auto bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-sm" suppressHydrationWarning>
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
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <input type="hidden" name="form-name" value="contact" />

                    {/* Appointment Type Selection - Only show if not in appointment mode */}
                    {
                        !data.appointmentMode && (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Wat wilt u doen? <span className="text-orange-600">*</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className={cn(
                                        "border rounded-xl p-4 cursor-pointer transition-all flex items-center bg-white",
                                        formData.appointmentType === 'appointment'
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    )}>
                                        <input
                                            type="radio"
                                            name="appointmentType"
                                            value="appointment"
                                            checked={formData.appointmentType === 'appointment'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                            required
                                        />
                                        <span className="ml-3 font-semibold text-gray-900">Afspraak maken</span>
                                    </label>
                                    <label className={cn(
                                        "border rounded-xl p-4 cursor-pointer transition-all flex items-center bg-white",
                                        formData.appointmentType === 'information'
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    )}>
                                        <input
                                            type="radio"
                                            name="appointmentType"
                                            value="information"
                                            checked={formData.appointmentType === 'information'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                        />
                                        <span className="ml-3 font-semibold text-gray-900">Informatie vragen</span>
                                    </label>
                                </div>
                            </div>
                        )
                    }

                    {/* Treatment Type Selection - Only show in appointment mode or when appointment is selected */}
                    {
                        (data.appointmentMode || formData.appointmentType === 'appointment') && (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Type behandeling <span className="text-orange-600">*</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className={cn(
                                        "border rounded-xl p-4 cursor-pointer transition-all bg-white",
                                        formData.treatmentType === 'free_intro'
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    )}>
                                        <input
                                            type="radio"
                                            name="treatmentType"
                                            value="free_intro"
                                            checked={formData.treatmentType === 'free_intro'}
                                            onChange={handleChange}
                                            className="hidden"
                                            required
                                        />
                                        <div className="font-semibold text-gray-900">Gratis Kennismaking</div>
                                        <div className="text-xs text-gray-500 mt-1">15 min • Telefonisch</div>
                                    </label>
                                    <label className={cn(
                                        "border rounded-xl p-4 cursor-pointer transition-all bg-white",
                                        formData.treatmentType === 'intake'
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    )}>
                                        <input
                                            type="radio"
                                            name="treatmentType"
                                            value="intake"
                                            checked={formData.treatmentType === 'intake'}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <div className="font-semibold text-gray-900">Intake / Nieuw</div>
                                        <div className="text-xs text-gray-500 mt-1">90 minuten • €120</div>
                                    </label>
                                    <label className={cn(
                                        "border rounded-xl p-4 cursor-pointer transition-all bg-white",
                                        formData.treatmentType === 'followup'
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    )}>
                                        <input
                                            type="radio"
                                            name="treatmentType"
                                            value="followup"
                                            checked={formData.treatmentType === 'followup'}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <div className="font-semibold text-gray-900">Vervolg</div>
                                        <div className="text-xs text-gray-500 mt-1">60 minuten • €100</div>
                                    </label>
                                </div>
                            </div>
                        )
                    }

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
                            className="w-full px-4 py-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                            className="w-full px-4 py-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                            className="w-full px-4 py-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="06-12345678"
                        />
                    </div>

                    {/* Preferred Time - Only show in appointment mode or when appointment is selected */}
                    {
                        (data.appointmentMode || formData.appointmentType === 'appointment') && (
                            <div>
                                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                                    Voorkeur momenten
                                </label>
                                <select
                                    id="preferredTime"
                                    name="preferredTime"
                                    value={formData.preferredTime}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Maakt niet uit</option>
                                    <option value="morning">Ochtenden (09:00 - 12:00)</option>
                                    <option value="afternoon">Middagen (12:00 - 17:00)</option>
                                    <option value="evening">Avonden (na 19:00, +€20)</option>
                                    <option value="weekend">Weekend (+€40)</option>
                                </select>
                            </div>
                        )
                    }

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
                            className="w-full px-4 py-3 border border-gray-200 bg-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                            placeholder={
                                (data.appointmentMode || formData.appointmentType === 'appointment')
                                    ? 'Beschrijf kort je klachten en eventuele voorkeursdagen...'
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
                    {
                        submitStatus === 'success' && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                <p className="text-green-800 text-center">
                                    {(data.appointmentMode || formData.appointmentType === 'appointment')
                                        ? '✓ Bedankt voor je afspraakaanvraag! Ik neem binnen 24 uur contact met je op om je afspraak in te plannen.'
                                        : '✓ Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.'
                                    }
                                </p>
                            </div>
                        )
                    }

                    {/* Error Message */}
                    {
                        submitStatus === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-800 text-center">
                                    Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.
                                </p>
                            </div>
                        )
                    }
                </form >
            </div >
        </Section >
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
        {
            type: 'boolean' as const,
            label: 'Appointment Mode',
            name: 'appointmentMode',
            description: 'Show appointment-specific fields (treatment type, time preferences)',
        },
    ],
};
