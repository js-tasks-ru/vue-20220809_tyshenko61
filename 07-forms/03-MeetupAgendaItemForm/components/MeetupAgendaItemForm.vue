<template>
  <fieldset class="agenda-item-form" >
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown v-model="localAgendaItem.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" name="startsAt" @input="handleStart" />
        </ui-form-group>
      </div>

      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </ui-form-group>
      </div>
    </div>

    <template v-if="localAgendaItem.type === 'talk'">
      <ui-form-group label="Тема">
        <ui-input v-model="localAgendaItem.title" name="title" />
      </ui-form-group>
      <ui-form-group label="Докладчик">
        <ui-input v-model="localAgendaItem.speaker" name="speaker" />
      </ui-form-group>
      <ui-form-group label="Описание">
        <ui-input v-model="localAgendaItem.description" multiline name="description" />
      </ui-form-group>
      <ui-form-group label="Язык">
        <ui-dropdown
          v-model="localAgendaItem.language" title="Язык" :options="$options.talkLanguageOptions" name="language" />
      </ui-form-group>
    </template>

    <template v-else-if="localAgendaItem.type === 'other'">
      <ui-form-group label="Заголовок">
        <ui-input v-model="localAgendaItem.title" name="title" />
      </ui-form-group>
      <ui-form-group label="Описание">
        <ui-input v-model="localAgendaItem.description" multiline name="description" />
      </ui-form-group>
    </template>

    <template v-else>
      <ui-form-group label="Нестандартный текст (необязательно)">
        <ui-input v-model="localAgendaItem.title" name="title" />
      </ui-form-group>
    </template>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
    };
  },

  emits: ['remove', 'update:agendaItem'],

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.localAgendaItem });
      },
    },
  },

  methods: {

    timeMinutes(timestring) {
      return parseInt(timestring.slice(0,2)) * 60 + parseInt(timestring.slice(-2));
    },

    timeMinutesToStr(minutes) {
      const h = Math.floor(minutes / 60) % 24;
      const m = minutes % 60
      return ((h < 10)? `0${h}` : `${h}`) + ":" + ((m < 10)? `0${m}` :`${m}`);
    },
    handleStart($event) {
      const newStart = $event.target.value;
      const newStartMin = this.timeMinutes(newStart);
      const startsAtMin = this.timeMinutes(this.localAgendaItem.startsAt);
      const endsAtMin = this.timeMinutes(this.localAgendaItem.endsAt);
      let diff = endsAtMin - startsAtMin;
      if (diff < 0) {
        diff += 24 * 60;
      }
      const newEnd = newStartMin + diff;
      this.localAgendaItem.endsAt = this.timeMinutesToStr(newEnd);
    },
  },

};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
