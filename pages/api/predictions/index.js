export default async function handler(req, res) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "fda927242b1db6affa1ece4f54c37f19b964666bf23b0d06ae2439067cd344a4",
      input: {
        prompt: req.body.prompt,
        cn_type1: "ImagePrompt",
        cn_type2: "ImagePrompt",
        cn_type3: "ImagePrompt",
        cn_type4: "ImagePrompt",
        sharpness: 2,
        image_seed: 50403806253646856,
        uov_method: "Disabled",
        image_number: 1,
        guidance_scale: 4,
        refiner_switch: 0.5,
        negative_prompt: "",
        style_selections: "Fooocus V2,Fooocus Enhance,Fooocus Sharp",
        uov_upscale_value: 0,
        outpaint_selections: "",
        outpaint_distance_top: 0,
        performance_selection: "Speed",
        outpaint_distance_left: 0,
        aspect_ratios_selection: "1152*896",
        outpaint_distance_right: 0,
        outpaint_distance_bottom: 0,
        inpaint_additional_prompt: ""
      }
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
