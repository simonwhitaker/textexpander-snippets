const Day = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function getDateOfNthDay(year, monthIndex, day = Day.Sunday, n) {
  const min = 1 + 7 * (n - 1);
  const max = 7 + 7 * (n - 1);
  for (let i = min; i <= max; i++) {
    const d = new Date(year, monthIndex, i);
    if (d.getDay() === day) {
      return i;
    }
  }
  throw new Error(`Can't find nth day`);
}

function getNextNGigs(n) {
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const monthYears = Array.from(Array(n).keys()).map(i => {
    const month = todayMonth + i;
    return {
      month: month % 12,
      year: todayYear + month / 12
    };
  });

  const bicesterGigs = monthYears.map(my => {
    return {
      location: "Bicester",
      date: new Date(
        my.year,
        my.month,
        getDateOfNthDay(my.year, my.month, Day.Sunday, 3),
        19,
        30
      )
    };
  });
  const banburyGigs = monthYears.map(my => {
    return {
      location: "Banbury",
      date: new Date(
        my.year,
        my.month,
        getDateOfNthDay(my.year, my.month, Day.Thursday, 2),
        19,
        30
      )
    };
  });
  const allGigs = [...bicesterGigs, ...banburyGigs].sort((a, b) => {
    return a.date.getTime() < b.date.getTime() ? -1 : 1;
  });

  // Filter out gigs that have already happened
  return allGigs
    .filter(gig => gig.date.getTime() > today.getTime())
    .slice(0, n);
}

const formatGig = function(gig) {
  const d = gig.date;
  const day = Days[d.getDay()];
  const month = Months[d.getMonth()];
  return `${gig.location}: ${day} ${d.getDate()} ${month}`;
};

const gigs = getNextNGigs(6);
for (const gig of gigs) {
  TextExpander.appendOutput(`* ${formatGig(gig)}\n`);
}
TextExpander.appendOutput("\nAll gigs start at 8pm, doors at 7:30pm\n\n");
