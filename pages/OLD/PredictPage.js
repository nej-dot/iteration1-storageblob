import React, { useState } from 'react';

export default function PredictPage() {
    const [formData, setFormData] = useState({
        prompt: '',
        sharpness: 2,
        image_seed: 50403806253646856,
        guidance_scale: 4,
        refiner_switch: 0.5,
        style_selections: "Fooocus V2,Fooocus Enhance,Fooocus Sharp",
        performance_selection: "Speed",
        aspect_ratios_selection: "1152*896"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/predictions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                cn_type1: "ImagePrompt",
                cn_type2: "ImagePrompt",
                cn_type3: "ImagePrompt",
                cn_type4: "ImagePrompt",
                uov_method: "Disabled",
                image_number: 1,
                negative_prompt: "",
                uov_upscale_value: 0,
                outpaint_selections: "",
                outpaint_distance_top: 0,
                outpaint_distance_left: 0,
                outpaint_distance_right: 0,
                outpaint_distance_bottom: 0,
                inpaint_additional_prompt: ""
            })
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <h1>Create Your Prediction</h1>
            <form onSubmit={handleSubmit}>
                {/* Input Fields and Sliders */}
                <div>
                    <label>Prompt:</label>
                    <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />
                </div>
                <div>
                    <label>Sharpness (0-10):</label>
                    <input type="range" name="sharpness" min="0" max="10" value={formData.sharpness} onChange={handleChange} />
                </div>
                <div>
                    <label>Guidance Scale (1-10):</label>
                    <input type="range" name="guidance_scale" min="1" max="10" value={formData.guidance_scale} onChange={handleChange} />
                </div>
                <div>
                    <label>Refiner Switch (0-1):</label>
                    <input type="range" name="refiner_switch" min="0" max="1" step="0.1" value={formData.refiner_switch} onChange={handleChange} />
                </div>
                <div>
                    <label>Style Selections:</label>
                    <select name="style_selections" value={formData.style_selections} onChange={handleChange}>
                        <option value="Fooocus V2">Fooocus V2</option>
                        <option value="Fooocus Enhance">Fooocus Enhance</option>
                        <option value="Fooocus Sharp">Fooocus Sharp</option>
                    </select>
                </div>
                <div>
                    <label>Performance:</label>
                    <select name="performance_selection" value={formData.performance_selection} onChange={handleChange}>
                        <option value="Speed">Speed</option>
                        <option value="Balance">Balance</option>
                        <option value="Quality">Quality</option>
                    </select>
                </div>
                <div>
                    <label>Aspect Ratio:</label>
                    <select name="aspect_ratios_selection" value={formData.aspect_ratios_selection} onChange={handleChange}>
                        <option value="1152*896">1152*896</option>
                        <option value="1280*720">1280*720</option>
                        <option value="1920*1080">1920*1080</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
