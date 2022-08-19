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

  // emits: ['update:meetupId'],

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
  //       fetchMeetupById(this.meetupId).then(
  //         (meetup) => {this.meetup = meetup;
  //                     }
  //       );
    this.load(this.meetupId);
    },

    watch: {
      meetupId: {
        handler(newValue) {
          this.load(newValue);
          // fetchMeetupById(newValue).then(
          //   (meetup) => {this.meetup = meetup;
          //     this.error = null;
          //   },
          //   (error) => {this.error = error.message}
          // );
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

