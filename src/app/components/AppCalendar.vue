<script setup lang="ts">
import { ref } from 'vue';
import { Months } from "@/core/enums";
import FluentIosArrowLtr24Regular from '~icons/fluent/ios-arrow-ltr-24-regular';
import FluentIosArrow24Regular from '~icons/fluent/ios-arrow-24-regular';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz.png';
const WEEKDAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

const hour = ref('12');
const minutes = ref('00');

const timePeriod = ref('PM');

const imageUrl = ref(IMAGE_URL);
const weekdays = ref(WEEKDAYS);
const weeks = ref<(number | null)[][]>([]);
const selectedDate = ref(new Date().getDate());
const month = ref(Months[new Date().getMonth() + 1]);
const isHourInputVisible = ref(false);
const inputHour = ref('12');
const isMinutesInputVisible = ref(false);
const inputMinutes = ref('00');

updateMonth();

function changeMonth(step: number): void {
  const currentMonthIndex = getMonthIndex(month.value);
  const newMonthIndex = (currentMonthIndex + step + 12) % 12;
  month.value = Months[newMonthIndex + 1];
  updateMonth();
}

function isDateSelected(date: number | null): boolean {
  return selectedDate.value === date;
}

function selectDate(date: number | null): void {
  if (date) {
    selectedDate.value = date;
  }
}

function toggleTimePeriod(): void {
  timePeriod.value = timePeriod.value === 'AM' ? 'PM' : 'AM';
}

function getWeeksOfMonth(monthIndex: number): (number | null)[][] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const weeks: (number | null)[][] = [];
  const monthCalendar = generateMonthCalendar(currentYear, monthIndex);

  for (const week of monthCalendar) {
    const dates: (number | null)[] = [];
    for (const day of week) {
      if (day === 0) {
        dates.push(null);
      } else {
        dates.push(day);
      }
    }

    weeks.push(dates);
  }

  return weeks;
}

function isCurrentMonth(): boolean {
  const currentMonthIndex = new Date().getMonth();
  return getMonthIndex(month.value) === currentMonthIndex;
}

function toggleHourInput(): void {
  isHourInputVisible.value = !isHourInputVisible.value;

  if (!isHourInputVisible.value) {
    hour.value = inputHour.value;
  }
}

function onHourInputChange(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const inputNumber = parseInt(inputElement.value, 10);

  if (!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 12) {
    inputHour.value = inputNumber.toString();
  } else {
    inputHour.value = '00';
  }
}

function toggleMinutesInput(): void {
  isMinutesInputVisible.value = !isMinutesInputVisible.value;

  if (!isMinutesInputVisible.value) {
    minutes.value = inputMinutes.value;
  }
}

function onMinutesInputChange(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const inputNumber = parseInt(inputElement.value, 10);

  if (!isNaN(inputNumber) && inputNumber >= 0 && inputNumber <= 59) {
  inputMinutes.value = inputNumber.toString().padStart(2, '0');
} else {
  inputMinutes.value = '00';
}
}

function getMonthIndex(month: string): number {
  return Object.values(Months).indexOf(month);
}

function updateMonth(): void {
  weeks.value = getWeeksOfMonth(getMonthIndex(month.value));
}

function generateMonthCalendar(year: number, month: number): number[][] {
  const monthCalendar: number[][] = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();

  let week: number[] = new Array(7).fill(0);

  for (let day = 1; day <= numDaysInMonth; day++) {
    const index = (firstDayOfWeek + day - 1) % 7;
    week[index] = day;

    if (index === 6 || day === numDaysInMonth) {
      monthCalendar.push(week);
      week = new Array(7).fill(0);
    }
  }

  return monthCalendar;
}
</script>

<template>
  <div class="calendar-container">
    <section class="arrow-label">
      <img
        class="logo"
        :src="imageUrl"
        alt="logo"
      >
      <div class="label">
        <FluentIosArrowLtr24Regular
          v-if="!isCurrentMonth()"
          @click="changeMonth(-1)"
        />
        <span>{{ month }}</span>
        <FluentIosArrow24Regular @click="changeMonth(1)" />
      </div>
    </section>
    <section class="date">
      <div class="weeks">
        <div
          v-for="day in weekdays"
          class="day header"
        >
          {{ day }}
        </div>
      </div>
      <div
        v-for="week in weeks"
        class="weeks"
      >
        <div
          v-for="date in week"
          class="day"
          :class="{ 'selected': isDateSelected(date) }"
          @click="selectDate(date)"
        >
          {{ date ? date : '' }}
        </div>
      </div>
    </section>
    <section class="time">
      <p class="date-time" />
      <div class="clock-wrapper">
        <div
          v-if="!isHourInputVisible"
          class="label"
          @click="toggleHourInput()"
        >
          {{ hour }}
        </div>
        <div
          v-if="isHourInputVisible"
          class="input-wrapper"
        >
          <input
            type="number"
            :value="inputHour"
            min="1"
            max="12"
            class="custom-input"
            @input="onHourInputChange($event)"
          >
        </div>
        <p class="dots">
          :
        </p>
        <div
          v-if="!isMinutesInputVisible"
          class="label"
          @click="toggleMinutesInput()"
        >
          {{ minutes }}
        </div>
        <div
          v-if="isMinutesInputVisible"
          class="input-wrapper"
        >
          <input
            type="number"
            :value="inputMinutes"
            min="0"
            max="59"
            class="custom-input"
            @input="onMinutesInputChange($event)"
          >
        </div>
      </div>
      <div
        class="label"
        @click="toggleTimePeriod()"
      >
        {{ timePeriod }}
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/sass/global';

.weeks {
  width: 12.2rem;
  height: 1rem;
  font-size: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header {
    font-weight: bold;
  }

  .day {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .selected {
    background-color: $green;
    color: $black;
    border-radius: 0.3rem;
  }
}

.header-row {
  height: 1rem;

  .header {
    color: $white;
    font-size: 0.6rem;
    font-weight: bold;
    width: 1rem;
    margin: 0;
    padding: 0;
    text-align: center;
  }
}

.calendar-container {
  display: flex;
  gap: 2rem;
  align-items: center;
  background-color: $black;
  color: $white;
  border-radius: 0.5rem;
  width: 33.8rem;
  height: 11.4rem;
  letter-spacing: 0rem;
}

.arrow-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7.3rem;
  margin-left: 2rem;

  .logo {
    position: absolute;
    width: 4.5rem;
  }

  .label {
    position: relative;
    justify-content: center;
    font-size: 0.8rem;
    margin-top: 1.5rem;
    width: 7rem;
  }

  .arrow,
  .arrow-l {
    font-size: 1rem;
    margin-top: 0.3rem;
    height: 1.4rem;
    border-radius: 2rem;
    color: $black;
    background-color: none;
    position: absolute;
  }

  .arrow {
    right: 0;
  }

  .arrow-l {
    left: 0;
  }
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7.3rem;
  margin-left: 2rem;

  .logo {
    position: absolute;
    width: 4.5rem;
  }

  .label {
    font-size: 0.8rem;
    position: relative;
    margin-top: 1.5rem;
  }
}

.date {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7.3rem;
  gap: 0.3rem;
  margin-right: 2rem;
}

.clock-wrapper {
  display: flex;
  gap: 0.2rem;

  .dots{
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
  }

  .label {
    width: 3.3rem;
  }
}

.label {
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.3rem;
  height: 2.3rem;
  font-weight: bold;
  border-radius: 0.5rem;
  background-color: $green;
  color: $black
}

.custom-input {
  border: none;
  border-radius: 0.5rem;
  background-color: $green;
  font-weight: bold;
  font-size: 1rem;
  height: 2.1rem;
  width: 2.9rem;
  margin-bottom: 0;
  text-align: center;
  outline: none;
}

</style>
