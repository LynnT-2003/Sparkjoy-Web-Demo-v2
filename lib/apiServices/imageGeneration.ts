export const buildRequestBody = (base64Image: string | null) => {
  const randomNumber = Math.floor(Math.random() * 100);

  if (randomNumber < 32) {
    // 30% chance for Santa
    return {
      input: {
        workflow: {
          "6": {
            inputs: {
              text: "A portrait of a character in ufotable-style fantasy whose ethereal magic style blends traditional holiday symbols with supernatural radiance. Their movements create spiral of golden light, brought to life through ufotable's signature dynamic animation. He is wearing santa costume wear long beard. In the background, there are Christmas Trees.",
              clip: ["11", 0],
            },
            class_type: "CLIPTextEncode",
            _meta: {
              title: "CLIP Text Encode (Positive Prompt)",
            },
          },
          "8": {
            inputs: {
              samples: ["13", 0],
              vae: ["10", 0],
            },
            class_type: "VAEDecode",
            _meta: {
              title: "VAE Decode",
            },
          },
          "9": {
            inputs: {
              filename_prefix: "ComfyUI",
              images: ["8", 0],
            },
            class_type: "SaveImage",
            _meta: {
              title: "Save Image",
            },
          },
          "10": {
            inputs: {
              vae_name: "ae.safetensors",
            },
            class_type: "VAELoader",
            _meta: {
              title: "Load VAE",
            },
          },
          "11": {
            inputs: {
              clip_name1: "t5xxl_fp8_e4m3fn.safetensors",
              clip_name2: "clip_l.safetensors",
              type: "flux",
            },
            class_type: "DualCLIPLoader",
            _meta: {
              title: "DualCLIPLoader",
            },
          },
          "12": {
            inputs: {
              unet_name: "flux1-dev.safetensors",
              weight_dtype: "fp8_e4m3fn",
            },
            class_type: "UNETLoader",
            _meta: {
              title: "Load Diffusion Model",
            },
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
            _meta: {
              title: "SamplerCustomAdvanced",
            },
          },
          "16": {
            inputs: {
              sampler_name: "euler",
            },
            class_type: "KSamplerSelect",
            _meta: {
              title: "KSamplerSelect",
            },
          },
          "17": {
            inputs: {
              scheduler: "beta",
              steps: 20,
              denoise: 1,
              model: ["30", 0],
            },
            class_type: "BasicScheduler",
            _meta: {
              title: "BasicScheduler",
            },
          },
          "22": {
            inputs: {
              model: ["12", 0],
              conditioning: ["49", 0],
            },
            class_type: "BasicGuider",
            _meta: {
              title: "BasicGuider",
            },
          },
          "25": {
            inputs: {
              noise_seed: Math.floor(Math.random() * 99999) + 1,
            },
            class_type: "RandomNoise",
            _meta: {
              title: "RandomNoise",
            },
          },
          "26": {
            inputs: {
              guidance: 3.5,
              conditioning: ["6", 0],
            },
            class_type: "FluxGuidance",
            _meta: {
              title: "FluxGuidance",
            },
          },
          "27": {
            inputs: {
              width: 1024,
              height: 1024,
              batch_size: 1,
            },
            class_type: "EmptySD3LatentImage",
            _meta: {
              title: "EmptySD3LatentImage",
            },
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
            _meta: {
              title: "ModelSamplingFlux",
            },
          },
          "38": {
            inputs: {
              clip_name: "sigclip_vision_patch14_384.safetensors",
            },
            class_type: "CLIPVisionLoader",
            _meta: {
              title: "Load CLIP Vision",
            },
          },
          "39": {
            inputs: {
              crop: "center",
              clip_vision: ["38", 0],
              image: ["52", 0],
            },
            class_type: "CLIPVisionEncode",
            _meta: {
              title: "CLIP Vision Encode",
            },
          },
          "40": {
            inputs: {
              image: "current.jpg",
              upload: "image",
            },
            class_type: "LoadImage",
            _meta: {
              title: "Load Image",
            },
          },
          "42": {
            inputs: {
              style_model_name: "flux1-redux-dev.safetensors",
            },
            class_type: "StyleModelLoader",
            _meta: {
              title: "Load Style Model",
            },
          },
          "45": {
            inputs: {
              image_strength: "medium",
              conditioning: ["26", 0],
              style_model: ["42", 0],
              clip_vision_output: ["39", 0],
            },
            class_type: "StyleModelApplySimple",
            _meta: {
              title: "StyleModelApplySimple",
            },
          },
          "49": {
            inputs: {
              image_strength: "medium",
              conditioning: ["45", 0],
              style_model: ["42", 0],
              clip_vision_output: ["50", 0],
            },
            class_type: "StyleModelApplySimple",
            _meta: {
              title: "StyleModelApplySimple",
            },
          },
          "50": {
            inputs: {
              crop: "center",
              clip_vision: ["38", 0],
              image: ["51", 0],
            },
            class_type: "CLIPVisionEncode",
            _meta: {
              title: "CLIP Vision Encode",
            },
          },
          "51": {
            inputs: {
              image: "santa.png",
              upload: "image",
            },
            class_type: "LoadImage",
            _meta: {
              title: "Load Image",
            },
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
            _meta: {
              title: "Resize Image",
            },
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
  } else if (randomNumber < 64) {
    // 30% chance for Elf
    return {
      input: {
        workflow: {
          "6": {
            inputs: {
              text: "A portrait of a man in ufotable-style fantasy whose ethereal magic style blends traditional holiday symbols with supernatural radiance. Their movements create spiral of golden light, brought to life through ufotable's signature dynamic animation. He is wearing elf costume. In the background, there are Christmas Trees.",
              clip: ["11", 0],
            },
            class_type: "CLIPTextEncode",
            _meta: {
              title: "CLIP Text Encode (Positive Prompt)",
            },
          },
          "8": {
            inputs: {
              samples: ["13", 0],
              vae: ["10", 0],
            },
            class_type: "VAEDecode",
            _meta: {
              title: "VAE Decode",
            },
          },
          "9": {
            inputs: {
              filename_prefix: "ComfyUI",
              images: ["8", 0],
            },
            class_type: "SaveImage",
            _meta: {
              title: "Save Image",
            },
          },
          "10": {
            inputs: {
              vae_name: "ae.safetensors",
            },
            class_type: "VAELoader",
            _meta: {
              title: "Load VAE",
            },
          },
          "11": {
            inputs: {
              clip_name1: "t5xxl_fp8_e4m3fn.safetensors",
              clip_name2: "clip_l.safetensors",
              type: "flux",
            },
            class_type: "DualCLIPLoader",
            _meta: {
              title: "DualCLIPLoader",
            },
          },
          "12": {
            inputs: {
              unet_name: "flux1-dev.safetensors",
              weight_dtype: "fp8_e4m3fn",
            },
            class_type: "UNETLoader",
            _meta: {
              title: "Load Diffusion Model",
            },
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
            _meta: {
              title: "SamplerCustomAdvanced",
            },
          },
          "16": {
            inputs: {
              sampler_name: "euler",
            },
            class_type: "KSamplerSelect",
            _meta: {
              title: "KSamplerSelect",
            },
          },
          "17": {
            inputs: {
              scheduler: "beta",
              steps: 20,
              denoise: 1,
              model: ["30", 0],
            },
            class_type: "BasicScheduler",
            _meta: {
              title: "BasicScheduler",
            },
          },
          "22": {
            inputs: {
              model: ["12", 0],
              conditioning: ["49", 0],
            },
            class_type: "BasicGuider",
            _meta: {
              title: "BasicGuider",
            },
          },
          "25": {
            inputs: {
              noise_seed: Math.floor(Math.random() * 99999) + 1,
            },
            class_type: "RandomNoise",
            _meta: {
              title: "RandomNoise",
            },
          },
          "26": {
            inputs: {
              guidance: 3.5,
              conditioning: ["6", 0],
            },
            class_type: "FluxGuidance",
            _meta: {
              title: "FluxGuidance",
            },
          },
          "27": {
            inputs: {
              width: 1024,
              height: 1024,
              batch_size: 1,
            },
            class_type: "EmptySD3LatentImage",
            _meta: {
              title: "EmptySD3LatentImage",
            },
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
            _meta: {
              title: "ModelSamplingFlux",
            },
          },
          "38": {
            inputs: {
              clip_name: "sigclip_vision_patch14_384.safetensors",
            },
            class_type: "CLIPVisionLoader",
            _meta: {
              title: "Load CLIP Vision",
            },
          },
          "39": {
            inputs: {
              crop: "center",
              clip_vision: ["38", 0],
              image: ["52", 0],
            },
            class_type: "CLIPVisionEncode",
            _meta: {
              title: "CLIP Vision Encode",
            },
          },
          "40": {
            inputs: {
              image: "current.jpg",
              upload: "image",
            },
            class_type: "LoadImage",
            _meta: {
              title: "Load Image",
            },
          },
          "42": {
            inputs: {
              style_model_name: "flux1-redux-dev.safetensors",
            },
            class_type: "StyleModelLoader",
            _meta: {
              title: "Load Style Model",
            },
          },
          "45": {
            inputs: {
              image_strength: "medium",
              conditioning: ["26", 0],
              style_model: ["42", 0],
              clip_vision_output: ["39", 0],
            },
            class_type: "StyleModelApplySimple",
            _meta: {
              title: "StyleModelApplySimple",
            },
          },
          "49": {
            inputs: {
              image_strength: "medium",
              conditioning: ["45", 0],
              style_model: ["42", 0],
              clip_vision_output: ["50", 0],
            },
            class_type: "StyleModelApplySimple",
            _meta: {
              title: "StyleModelApplySimple",
            },
          },
          "50": {
            inputs: {
              crop: "center",
              clip_vision: ["38", 0],
              image: ["51", 0],
            },
            class_type: "CLIPVisionEncode",
            _meta: {
              title: "CLIP Vision Encode",
            },
          },
          "51": {
            inputs: {
              image: "elf.png",
              upload: "image",
            },
            class_type: "LoadImage",
            _meta: {
              title: "Load Image",
            },
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
            _meta: {
              title: "Resize Image",
            },
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
  } else if (randomNumber < 96) {
    // 30% chance for Reindeer
    return {
      input: {
        workflow: {
          "6": {
            inputs: {
              text: "A portrait of a character in ufotable-style fantasy whose ethereal magic style blends traditional holiday symbols with supernatural radiance. Their movements create spiral of golden light, brought to life through ufotable's signature dynamic animation. He is wearing reindeer horn on his head. In the background, there are Christmas Trees.",
              clip: ["11", 0],
            },
            class_type: "CLIPTextEncode",
            _meta: {
              title: "CLIP Text Encode (Positive Prompt)",
            },
          },
          "8": {
            inputs: {
              samples: ["13", 0],
              vae: ["10", 0],
            },
            class_type: "VAEDecode",
            _meta: {
              title: "VAE Decode",
            },
          },
          "9": {
            inputs: {
              filename_prefix: "ComfyUI",
              images: ["8", 0],
            },
            class_type: "SaveImage",
            _meta: {
              title: "Save Image",
            },
          },
          "10": {
            inputs: {
              vae_name: "ae.safetensors",
            },
            class_type: "VAELoader",
            _meta: {
              title: "Load VAE",
            },
          },
          "11": {
            inputs: {
              clip_name1: "t5xxl_fp8_e4m3fn.safetensors",
              clip_name2: "clip_l.safetensors",
              type: "flux",
            },
            class_type: "DualCLIPLoader",
            _meta: {
              title: "DualCLIPLoader",
            },
          },
          "12": {
            inputs: {
              unet_name: "flux1-dev.safetensors",
              weight_dtype: "fp8_e4m3fn",
            },
            class_type: "UNETLoader",
            _meta: {
              title: "Load Diffusion Model",
            },
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
            _meta: {
              title: "SamplerCustomAdvanced",
            },
          },
          "16": {
            inputs: {
              sampler_name: "euler",
            },
            class_type: "KSamplerSelect",
            _meta: {
              title: "KSamplerSelect",
            },
          },
          "17": {
            inputs: {
              scheduler: "beta",
              steps: 20,
              denoise: 1,
              model: ["30", 0],
            },
            class_type: "BasicScheduler",
            _meta: {
              title: "BasicScheduler",
            },
          },
          "22": {
            inputs: {
              model: ["12", 0],
              conditioning: ["49", 0],
            },
            class_type: "BasicGuider",
            _meta: {
              title: "BasicGuider",
            },
          },
          "25": {
            inputs: {
              noise_seed: Math.floor(Math.random() * 99999) + 1,
            },
            class_type: "RandomNoise",
            _meta: {
              title: "RandomNoise",
            },
          },
          "26": {
            inputs: {
              guidance: 3.5,
              conditioning: ["6", 0],
            },
            class_type: "FluxGuidance",
            _meta: {
              title: "FluxGuidance",
            },
          },
          "27": {
            inputs: {
              width: 1024,
              height: 1024,
              batch_size: 1,
            },
            class_type: "EmptySD3LatentImage",
            _meta: {
              title: "EmptySD3LatentImage",
            },
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
            _meta: {
              title: "ModelSamplingFlux",
            },
          },
          "38": {
            inputs: {
              clip_name: "sigclip_vision_patch14_384.safetensors",
            },
            class_type: "CLIPVisionLoader",
            _meta: {
              title: "Load CLIP Vision",
            },
          },
          "39": {
            inputs: {
              crop: "center",
              clip_vision: ["38", 0],
              image: ["52", 0],
            },
            class_type: "CLIPVisionEncode",
            _meta: {
              title: "CLIP Vision Encode",
            },
          },
          "40": {
            inputs: {
              image: "current.jpg",
              upload: "image",
            },
            class_type: "LoadImage",
            _meta: {
              title: "Load Image",
            },
          },
          "42": {
            inputs: {
              style_model_name: "flux1-redux-dev.safetensors",
            },
            class_type: "StyleModelLoader",
            _meta: {
              title: "Load Style Model",
            },
          },
          "45": {
            inputs: {
              image_strength: "medium",
              conditioning: ["26", 0],
              style_model: ["42", 0],
              clip_vision_output: ["39", 0],
            },
            class_type: "StyleModelApplySimple",
            _meta: {
              title: "StyleModelApplySimple",
            },
          },
          "49": {
            inputs: {
              image_strength: "low",
              conditioning: ["45", 0],
              style_model: ["42", 0],
              clip_vision_output: ["50", 0],
            },
            class_type: "StyleModelApplySimple",
            _meta: {
              title: "StyleModelApplySimple",
            },
          },
          "50": {
            inputs: {
              crop: "center",
              clip_vision: ["38", 0],
              image: ["51", 0],
            },
            class_type: "CLIPVisionEncode",
            _meta: {
              title: "CLIP Vision Encode",
            },
          },
          "51": {
            inputs: {
              image: "reindeer.png",
              upload: "image",
            },
            class_type: "LoadImage",
            _meta: {
              title: "Load Image",
            },
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
            _meta: {
              title: "Resize Image",
            },
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
  } else {
    // 10% chance for Padoru
    return {
      input: {
        workflow: {
          "3": {
            inputs: {
              seed: Math.floor(Math.random() * 99999) + 1,
              steps: 20,
              cfg: 1,
              sampler_name: "euler",
              scheduler: "beta",
              denoise: 0.9,
              model: ["31", 0],
              positive: ["35", 0],
              negative: ["35", 1],
              latent_image: ["35", 2],
            },
            class_type: "KSampler",
            _meta: {
              title: "KSampler",
            },
          },
          "7": {
            inputs: {
              text: "",
              clip: ["34", 0],
            },
            class_type: "CLIPTextEncode",
            _meta: {
              title: "CLIP Text Encode (Negative Prompt)",
            },
          },
          "8": {
            inputs: {
              samples: ["3", 0],
              vae: ["32", 0],
            },
            class_type: "VAEDecode",
            _meta: {
              title: "VAE Decode",
            },
          },
          "9": {
            inputs: {
              filename_prefix: "ComfyUI",
              images: ["8", 0],
            },
            class_type: "SaveImage",
            _meta: {
              title: "Save Image",
            },
          },
          "17": {
            inputs: {
              image: "padoru.png",
              upload: "image",
            },
            class_type: "LoadImage",
            _meta: {
              title: "Load Image",
            },
          },
          "18": {
            inputs: {
              low_threshold: 0.15,
              high_threshold: 0.3,
              image: ["17", 0],
            },
            class_type: "Canny",
            _meta: {
              title: "Canny",
            },
          },
          "23": {
            inputs: {
              text: "A chibi padoru character in winter attire. They wear a festive Santa shirt and long black leggings, topped with a playful red Santa hat. The artwork features a soft, kawaii style against a white background of gentle lgiht blue snowflakes, accompanied by a gift sack in white color.",
              clip: ["34", 0],
            },
            class_type: "CLIPTextEncode",
            _meta: {
              title: "CLIP Text Encode (Positive Prompt)",
            },
          },
          "26": {
            inputs: {
              guidance: 30,
              conditioning: ["41", 0],
            },
            class_type: "FluxGuidance",
            _meta: {
              title: "FluxGuidance",
            },
          },
          "31": {
            inputs: {
              unet_name: "flux1-canny-dev.safetensors",
              weight_dtype: "fp8_e4m3fn",
            },
            class_type: "UNETLoader",
            _meta: {
              title: "Load Diffusion Model",
            },
          },
          "32": {
            inputs: {
              vae_name: "ae.safetensors",
            },
            class_type: "VAELoader",
            _meta: {
              title: "Load VAE",
            },
          },
          "34": {
            inputs: {
              clip_name1: "clip_l.safetensors",
              clip_name2: "t5xxl_fp8_e4m3fn.safetensors",
              type: "flux",
            },
            class_type: "DualCLIPLoader",
            _meta: {
              title: "DualCLIPLoader",
            },
          },
          "35": {
            inputs: {
              positive: ["26", 0],
              negative: ["7", 0],
              vae: ["32", 0],
              pixels: ["18", 0],
            },
            class_type: "InstructPixToPixConditioning",
            _meta: {
              title: "InstructPixToPixConditioning",
            },
          },
          "36": {
            inputs: {
              image: "current.jpg",
              upload: "image",
            },
            class_type: "LoadImage",
            _meta: {
              title: "Load Image",
            },
          },
          "38": {
            inputs: {
              clip_name: "sigclip_vision_patch14_384.safetensors",
            },
            class_type: "CLIPVisionLoader",
            _meta: {
              title: "Load CLIP Vision",
            },
          },
          "39": {
            inputs: {
              crop: "center",
              clip_vision: ["38", 0],
              image: ["59", 0],
            },
            class_type: "CLIPVisionEncode",
            _meta: {
              title: "CLIP Vision Encode",
            },
          },
          "40": {
            inputs: {
              style_model_name: "flux1-redux-dev.safetensors",
            },
            class_type: "StyleModelLoader",
            _meta: {
              title: "Load Style Model",
            },
          },
          "41": {
            inputs: {
              image_strength: "high",
              conditioning: ["23", 0],
              style_model: ["40", 0],
              clip_vision_output: ["39", 0],
            },
            class_type: "StyleModelApplySimple",
            _meta: {
              title: "StyleModelApplySimple",
            },
          },
          "42": {
            inputs: {
              model_name: "sam_vit_h (2.56GB)",
            },
            class_type: "SAMModelLoader (segment anything)",
            _meta: {
              title: "SAMModelLoader (segment anything)",
            },
          },
          "43": {
            inputs: {
              model_name: "GroundingDINO_SwinT_OGC (694MB)",
            },
            class_type: "GroundingDinoModelLoader (segment anything)",
            _meta: {
              title: "GroundingDinoModelLoader (segment anything)",
            },
          },
          "44": {
            inputs: {
              prompt: "hair, glasses, face, neck",
              threshold: 0.3,
              sam_model: ["42", 0],
              grounding_dino_model: ["43", 0],
              image: ["36", 0],
            },
            class_type: "GroundingDinoSAMSegment (segment anything)",
            _meta: {
              title: "GroundingDinoSAMSegment (segment anything)",
            },
          },
          "50": {
            inputs: {
              masks: ["44", 1],
            },
            class_type: "Mask Invert",
            _meta: {
              title: "Mask Invert",
            },
          },
          "52": {
            inputs: {
              mask: ["50", 0],
            },
            class_type: "MaskToImage",
            _meta: {
              title: "Convert Mask to Image",
            },
          },
          "54": {
            inputs: {
              x: 0,
              y: 0,
              resize_source: false,
              destination: ["44", 0],
              source: ["52", 0],
              mask: ["50", 0],
            },
            class_type: "ImageCompositeMasked",
            _meta: {
              title: "ImageCompositeMasked",
            },
          },
          "59": {
            inputs: {
              width: 1024,
              height: 1024,
              interpolation: "nearest",
              method: "fill / crop",
              condition: "always",
              multiple_of: 0,
              image: ["54", 0],
            },
            class_type: "ImageResize+",
            _meta: {
              title: "\ud83d\udd27 Image Resize",
            },
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
  }
};
