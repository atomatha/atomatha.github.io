<template>
  <div class="flex-h">
    <div>
      Stable Diffusion checkpoint
      <br />
      <ef-select :data="checkpoints" @value-changed="hash = $event.target.value">
      </ef-select>
    </div>
    <div>
      Clip skip
      <ef-slider style="width: 250px;" show-steps show-input-field min="1" max="12" value="2" disabled></ef-slider>
    </div>
  </div>
  <!-- <ef-tab-bar class="mt-m" level="1" id="tabs" @value-changed="main_tab_index = $event.target.value;">
    <ef-tab label="txt2img" value="txt2img" active></ef-tab>
    <ef-tab label="img2img" value="img2img"></ef-tab>
  </ef-tab-bar> -->
  <ef-panel spacing class="wrapper">
    <div class="setting">
      <template v-if="main_tab_index == 'txt2img'">
        <div>Prompt</div>
        <div class="prompt-area">

          <div class="item" v-for="prompt in prompts_toggle" :key="prompt.value">
            <ef-toggle :disabled="prompt.disabled" :checked="prompt.selected"
              @checked-changed="prompt.selected = $event.detail.value"></ef-toggle> <span class="label">{{ prompt.label
              }}</span>
          </div>
        </div>
        <div class="mt-l">Negative Prompt</div>
        <div class="prompt-area">
          <div class="item" v-for="prompt in neg_prompts_toggle" :key="prompt.value">
            <ef-toggle :disabled="prompt.disabled" :checked="prompt.selected"
              @checked-changed="prompt.selected = $event.detail.value"></ef-toggle> <span class="label">{{ prompt.label
              }}</span>
          </div>
        </div>
        <div class="flex-h mt-l">
          <div>
            Sampling method
            <br />
            <ef-select :data="sampling_methods" @value-changed="sampling_method = $event.target.value"></ef-select>
          </div>
          <div class="f-100">
            Sampling steps
            <ef-slider style="width: 100%;" show-steps show-input-field min="10" max="40" value="20" step="10"
              @value-changed="step = $event.target.value % 10 == 0 ? $event.target.value : step"></ef-slider>
          </div>
        </div>
        <div class="mt-m">
          Width
          <ef-slider style="width: 100%;" show-steps show-input-field min="512" max="768" value="512" step="256"
            @value-changed="width = $event.target.value % 256 == 0 ? $event.target.value : width"></ef-slider>
        </div>
        <div class="mt-m">
          Height
          <ef-slider style="width: 100%;" show-steps show-input-field min="512" max="768" value="512" step="256"
            @value-changed="height = $event.target.value % 256 == 0 ? $event.target.value : height"></ef-slider>
        </div>
        <div class="mt-m">
          CFG Scale
          <ef-slider style="width: 100%;" show-steps show-input-field min="5" max="9" value="7" step="2"
            @value-changed="cfg = [5, 7, 9].includes(parseInt($event.target.value)) ? $event.target.value : cfg"></ef-slider>
        </div>
        <div class="mt-m">
          Seed
          <ef-number-field disabled id="Seed" value="56160134"></ef-number-field>
        </div>
      </template>
      <!-- <template v-else-if="main_tab_index == 'img2img'">
        Comming Soon... (might be)
      </template> -->
    </div>
    <div v-if="!loading" class="f-100">
      <ef-panel>
        <div class="preview-container">
          <img alt="preview image" :src="previewFileName" />
        </div>
        <!-- <p>
          {{ previewFileName }}
        </p> -->
      </ef-panel>
      <ef-panel>
        <ef-card class="prompt-area mt-l w-100">
          <p>
            {{ promptsInfo }}
            <template v-if="neg_promptsInfo">
              <br />
              Negative prompt: {{ neg_promptsInfo }}
            </template>
            <br />
            Steps: {{ step }}, Sampler: {{ sampling_method_info }}, CFG scale: {{ cfg }}, Seed: 56160134, Size: {{ width
            }}x{{
  height }}, Model hash: {{ hash }}, Model: {{ hash_name }},{{ clip_skip > 1 ? `Clip skip: ${clip_skip}` : ''
  }},
            Version: v1.3.0-RC-18-ga6e653be
          </p>
        </ef-card>
      </ef-panel>
    </div>
  </ef-panel>
</template>
<script>
import default_data from './default_data.json'
export default {
  name: 'app',
  data() {
    return {
      ...default_data,
      loading: false,
    };
  },
  mounted() {

  },
  methods: {
    // copyPromptConfig(e) {
    //   navigator.clipboard.writeText(e.target.textContent);
    //   console.log(e.target.textContent);
    // }
  },
  computed: {
    hash_name() {
      return this.checkpoints.filter(p => p.selected == true)[0].label
    },
    prompt_selected() {
      return this.prompts_toggle.filter(p => p.selected == true)
    },
    prompt_selected_value() {
      return this.prompt_selected.map(p => p.value)
    },
    prompt_selected_label() {
      return this.prompt_selected.map(p => p.label)
    },
    neg_prompt_selected() {
      return this.neg_prompts_toggle.filter(p => p.selected == true)
    },
    neg_prompt_selected_value() {
      return this.neg_prompt_selected.map(p => p.value)
    },
    neg_prompt_selected_label() {
      return this.neg_prompt_selected.map(p => p.label)
    },
    previewFileName() {
      const prompts = [...this.prompt_selected_value, ...this.neg_prompt_selected_value].sort().join(', ');
      return './assets/' + `${this.hash}-${prompts}-${this.step}-${this.sampling_method_info}-${this.cfg}.0-${this.width}x${this.height}-${this.clip_skip}.jpg`
    },
    promptsInfo() {
      return this.prompt_selected_label.join(', ')
    },
    neg_promptsInfo() {
      return this.neg_prompt_selected_label.join(', ')
    },
    sampling_method_info() {
      return this.sampling_methods.filter(i => i.value === this.sampling_method)[0].label
    }
  }
}
</script>

<style>
body {
  padding: 16px;
}

.prompt-area {
  background-color: #8d8d8d3d;
  padding: 6px;
  border-radius: 6px;
}

.prompt-area div:not(:last-child) {
  margin-bottom: 8px;
}

.wrapper,
.flex-h {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.setting {
  width: 40%;
}

@media (max-width: 760px) {
  .setting {
    width: 100%;
  }
}

.f-100 {
  flex: 1;
}

.w-100 {
  width: 100%;
}

.mt-m {
  margin-top: 8px;
}

.mt-l {
  margin-top: 14px;
}


.label {
  margin-left: 1em;
}

.preview-container {
  width: 100%;

  background-color: #8d8d8d3d;
  border-radius: 6px;
}

.preview-container img {
  width: 100%;
  height: 512px;
  object-fit: contain;
}

ef-toggle {
  height: 20px;
  width: 36px;
  flex: 0 0 36px;
}

.item {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
