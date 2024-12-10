export const buildRequestBody = (base64Image: string | null) => {
  const randomNumber = Math.floor(Math.random() * 100);
  let prompt: string;

  if (randomNumber < 30) {
    prompt =
      "A portrait of a man in ufotable-style fantasy whose ethereal magic style blends traditional holiday symbols with supernatural radiance. Their movements create spiral of golden light, brought to life through ufotable's signature dynamic animation. In the background, there are Christmas Trees.";
  } else if (randomNumber < 60) {
    prompt = "Prompt 2";
  } else if (randomNumber < 90) {
    prompt = "Prompt 3";
  } else {
    prompt = "Prompt 4";
  }

  return {
    input: {
      workflow: {
        "6": {
          inputs: {
            text: "A portrait of a man in ufotable-style fantasy whose ethereal magic style blends traditional holiday symbols with supernatural radiance. Their movements create spiral of golden light, brought to life through ufotable's signature dynamic animation. In the background, there are Christmas Trees.",
            clip: ["11", 0],
          },
          class_type: "CLIPTextEncode",
        },
        "8": {
          inputs: {
            samples: ["13", 0],
            vae: ["10", 0],
          },
          class_type: "VAEDecode",
        },
        "9": {
          inputs: {
            filename_prefix: "ComfyUI",
            images: ["8", 0],
          },
          class_type: "SaveImage",
        },
        "10": {
          inputs: {
            vae_name: "ae.safetensors",
          },
          class_type: "VAELoader",
        },
        "11": {
          inputs: {
            clip_name1: "t5xxl_fp8_e4m3fn.safetensors",
            clip_name2: "clip_l.safetensors",
            type: "flux",
          },
          class_type: "DualCLIPLoader",
        },
        "12": {
          inputs: {
            unet_name: "flux1-dev.safetensors",
            weight_dtype: "fp8_e4m3fn",
          },
          class_type: "UNETLoader",
        },
        "13": {
          inputs: {
            noise: ["25", 0],
            guider: ["22", 0],
            sampler: ["16", 0],
            sigmas: ["17", 0],
            latent_image: ["27", 0],
          },
          class_type: "SamplerCustomAdvanced",
        },
        "16": {
          inputs: {
            sampler_name: "euler",
          },
          class_type: "KSamplerSelect",
        },
        "17": {
          inputs: {
            scheduler: "beta",
            steps: 20,
            denoise: 1,
            model: ["30", 0],
          },
          class_type: "BasicScheduler",
        },
        "22": {
          inputs: {
            model: ["12", 0],
            conditioning: ["49", 0],
          },
          class_type: "BasicGuider",
        },
        "25": {
          inputs: {
            noise_seed: Math.floor(Math.random() * 99999) + 1,
          },
          class_type: "RandomNoise",
        },
        "26": {
          inputs: {
            guidance: 3.5,
            conditioning: ["6", 0],
          },
          class_type: "FluxGuidance",
        },
        "27": {
          inputs: {
            width: 1024,
            height: 1024,
            batch_size: 1,
          },
          class_type: "EmptySD3LatentImage",
        },
        "30": {
          inputs: {
            max_shift: 1.15,
            base_shift: 0.5,
            width: 1024,
            height: 1024,
            model: ["12", 0],
          },
          class_type: "ModelSamplingFlux",
        },
        "38": {
          inputs: {
            clip_name: "sigclip_vision_patch14_384.safetensors",
          },
          class_type: "CLIPVisionLoader",
        },
        "39": {
          inputs: {
            clip_vision: ["38", 0],
            image: ["52", 0],
          },
          class_type: "CLIPVisionEncode",
        },
        "40": {
          inputs: {
            image: "current.jpg",
            upload: "image",
          },
          class_type: "LoadImage",
        },
        "42": {
          inputs: {
            style_model_name: "flux1-redux-dev.safetensors",
          },
          class_type: "StyleModelLoader",
        },
        "45": {
          inputs: {
            image_strength: "medium",
            conditioning: ["26", 0],
            style_model: ["42", 0],
            clip_vision_output: ["39", 0],
          },
          class_type: "StyleModelApplySimple",
        },
        "49": {
          inputs: {
            image_strength: "medium",
            conditioning: ["45", 0],
            style_model: ["42", 0],
            clip_vision_output: ["50", 0],
          },
          class_type: "StyleModelApplySimple",
        },
        "50": {
          inputs: {
            clip_vision: ["38", 0],
            image: ["51", 0],
          },
          class_type: "CLIPVisionEncode",
        },
        "51": {
          inputs: {
            image: "ChrismasSuit.png",
            upload: "image",
          },
          class_type: "LoadImage",
        },
        "52": {
          inputs: {
            width: 1024,
            height: 1024,
            upscale_method: "nearest-exact",
            keep_proportion: false,
            divisible_by: 2,
            crop: "disabled",
            image: ["40", 0],
          },
          class_type: "ImageResizeKJ",
        },
      },
      images: [
        {
          name: "current.jpg",
          image: base64Image,
        },
      ],
    },
  };
};
