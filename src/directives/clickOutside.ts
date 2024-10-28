import { onBeforeUnmount } from 'vue';


const vClickOutside = {
    mounted(el: HTMLElement, binding: any) {
    const clickHandler = (event: MouseEvent) => {
        if (!el.contains(event.target as Node)) {
        binding.value(); // Call the function passed to v-click-outside
        }
    };

    // Attach the listener on mount
    document.addEventListener('click', clickHandler);

    // Cleanup when the element is unmounted
    onBeforeUnmount(() => {
        document.removeEventListener('click', clickHandler);
    });
    },
};

export default vClickOutside;