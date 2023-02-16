import { getCurrentInstance } from "vue";

const useCurrentInstance = () => {
  const { appContext } = getCurrentInstance();
  const proxy = appContext.config.globalProperties;
  return proxy;
};

export default useCurrentInstance;