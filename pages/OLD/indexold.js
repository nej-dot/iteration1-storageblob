import React, { useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
    const [formData, setFormData] = useState({
        prompt: '',
        sharpness: 2,
        image_seed: '',
        guidance_scale: 4,
        refiner_switch: 0.5,
        style_selections: "Fooocus V2",
        performance_selection: "Speed",
        aspect_ratios_selection: "1152*896",
        image_number: '1',
        uov_method: "Disabled",
        negative_prompt: "",
        uov_upscale_value: '0',
        outpaint_selections: "",
        outpaint_distance_top: '0',
        outpaint_distance_left: '0',
        outpaint_distance_right: '0',
        outpaint_distance_bottom: '0',
        inpaint_additional_prompt: "",
        loading: false,
        error: null,
        prediction: null
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await fetch('/api/predictions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.status === 201) {
                setFormData(prev => ({ ...prev, prediction: data, loading: false }));
            } else {
                setFormData(prev => ({ ...prev, error: data.detail, loading: false }));
            }
        } catch (error) {
            setFormData(prev => ({ ...prev, error: "An error occurred while fetching the prediction.", loading: false }));
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Prediction</title>
            </Head>
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Text input for prompt */}
                <label>Prompt:</label>
                <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />

                {/* Slider for sharpness */}
                <label>Sharpness (0-10):</label>
                <input type="range" name="sharpness" min="0" max="10" value={formData.sharpness} onChange={handleChange} />
                <span>{formData.sharpness}</span>

                {/* Text input for image seed */}
                <label>Image Seed:</label>
                <input type="text" name="image_seed" value={formData.image_seed} onChange={handleChange} />

                {/* Slider for guidance scale */}
                <label>Guidance Scale (1-10):</label>
                <input type="range" name="guidance_scale" min="1" max="10" value={formData.guidance_scale} onChange={handleChange} />
                <span>{formData.guidance_scale}</span>

                {/* Slider for refiner switch */}
                <label>Refiner Switch (0-1):</label>
                <input type="range" name="refiner_switch" min="0" max="1" step="0.1" value={formData.refiner_switch} onChange={handleChange} />
                <span>{formData.refiner_switch}</span>

                {/* Dropdown for style selections */}
                <label>Style Selections:</label>
                <select name="style_selections" value={formData.style_selections} onChange={handleChange}>
                    <option value="Fooocus V2">Fooocus V2</option>
                    <option value="Fooocus Enhance">Fooocus Enhance</option>
                    <option value="Fooocus Sharp">Fooocus Sharp</option>
                </select>

                {/* Dropdown for performance selection */}
                <label>Performance:</label>
                <select name="performance_selection" value={formData.performance_selection} onChange={handleChange}>
                    <option value="Speed">Speed</option>
                    <option value="Balance">Balance</option>
                    <option value="Quality">Quality</option>
                </select>

                {/* Dropdown for aspect ratios selection */}
                <label>Aspect Ratio:</label>
                <select name="aspect_ratios_selection" value={formData.aspect_ratios_selection} onChange={handleChange}>
                    <option value="1152*896">1152*896</option>
                    <option value="1280*720">1280*720</option>
                    <option value="1920*1080">1920*1080</option>
                </select>

                <button type="submit" disabled={formData.loading}>{formData.loading ? 'Generating...' : 'Generate'}</button>
            </form>

            {formData.error && <div className={styles.error}>{formData.error}</div>}

            {formData.prediction && formData.prediction.output && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={formData.prediction.output[formData.prediction.output.length - 1]}
                        alt="Output image"
                        layout="fill"
                        objectFit="cover"
                    />
                    <p>Status: {formData.prediction.status}</p>
                </div>
            )}
        </div>
    );
}
