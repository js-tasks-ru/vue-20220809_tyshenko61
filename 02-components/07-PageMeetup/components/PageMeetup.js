import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';


export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      meetup: null,
      error: null,
    }
  },

  methods: {
    load(value) {
      this.error = null;
      this.meetup =null;
      fetchMeetupById(value).then(
        (meetup) => {this.meetup = meetup;
        },
        (error) => {this.error = error.message}
      );
    }
  },

  mounted() {
      this.load(this.meetupId);
    },

    watch: {
      meetupId: {
        handler(newValue) {
          this.load(newValue);
        }
       }
     },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup && !error" :meetup="this.meetup" />
      <UiContainer v-else-if="!error">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else>
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});

