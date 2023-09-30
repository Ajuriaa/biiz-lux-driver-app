import { ref, reactive, watch } from 'vue';
import { showModal } from "@/services/modal";

export const hasNewTrip = ref(false);

export const travelData = reactive({
    startCoords: {
        lat: 0,
        lng: 0
    },
    endCoords: {
        lat: 0,
        lng: 0
    },
    fare: 0,
    passengerId: 0
});

export const isArriving = ref(false);
export const isTraveling = ref(false);

watch(hasNewTrip, (value) => {
    if (value) showModal.value = true;
});
