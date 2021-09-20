import { RootStore } from "@/store/store";
import { Vue, Component } from "vue-property-decorator";
import { useStore } from "vuex-simple";

@Component
export default class MainMixin extends Vue {
  store: RootStore = useStore(this.$store);
}