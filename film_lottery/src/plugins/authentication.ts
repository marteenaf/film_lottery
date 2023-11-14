import { useUserStore } from "@/stores/usersStore";

export const authentication = {
  async install() {
    const store = useUserStore();
    try {
      await store.refresh();
      return;
    } catch {
      return;
    }
  }
};