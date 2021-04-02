export const team = [
  {
    name: 'Oleg Puzanov',
    position: 'CTO',
    image: {
      file: 'oleg-puzanov',
    },
  },
  {
    name: 'Ruslan Kasymov',
    position: 'QA Engineer and PM',
    image: {
      file: 'kasymov',
    },
  },
  {
    name: 'Rustom Kulbatyrov',
    position: 'Android Developer',
    image: {
      file: 'kulbatyrov',
    },
  },
  {
    name: 'Vladimir Pan',
    position: 'QA Engineer',
    image: {
      file: 'vladimir-pan',
    },
  },
  {
    name: 'Belek Abylov',
    position: 'Backend Developer',
    image: {
      file: 'belek-abylov',
    },
  },
  {
    name: 'Bakhtiyar Ganyev',
    position: 'iOS Developer',
    image: {
      file: 'bakhtiyar-ganyev',
    },
  },
  {
    name: 'Gennady Karev',
    position: 'Backend Developer',
    image: {
      file: 'gennady-karev',
    },
  },
  {
    name: 'Aleksandr Krivov',
    position: 'UX/UI Specialist',
    image: {
      file: 'aleksandr-krivov',
    },
  },
  {
    name: 'Vlada Arevkova',
    position: 'UX/UI Specialist',
    image: {
      file: 'vlada-arevkova',
    },
  },
  {
    name: 'Erik Sultanaliev',
    position: 'Backend Developer',
    image: {
      file: 'erik-sultanaliev',
    },
  },
  {
    name: 'Myrzabek Kylychev',
    position: 'Android Developer',
    image: {
      file: 'myrzabek-kylychev',
    },
  },
  {
    name: 'Pavel Pushkarev',
    position: 'iOS Developer',
    image: {
      file: 'pushkarev',
    },
  },
]

export const technologies = [
  {
    name: 'Open Street Map',
    className: 'other-open-street-map',
  },
  {
    name: 'Google Maps',
    className: 'other-google-maps',
  },
  {
    name: 'PostgreSQL',
    className: 'backend-postgresql',
  },
  {
    name: 'Docker',
    className: 'devops-docker case_technologies-item__docker',
  },
  {
    name: 'Nginx',
    className: 'devops-nginx',
  },
  {
    name: 'Redis',
    className: 'backend-redis',
  },
  {
    name: 'Python (Django)',
    className: 'backend-python',
  },
  {
    name: 'Golang',
    className: 'backend-go',
  },
  {
    name: 'Kotlin',
    className: 'mobile-kotlin',
  },
  {
    name: 'Atlassian',
    className: 'pm-atlassian',
  },
  {
    name: 'Swift',
    className: 'mobile-swift',
  },
  {
    name: 'Firebase',
    className: 'mobile-firebase',
  },
  {
    name: 'TestFlight',
    className: 'mobile-test-flight',
  },
  {
    name: 'Datadog',
    className: 'infrastructure-datadog',
  },
  {
    name: 'Android',
    className: 'mobile-android-black-text',
  },
  {
    name: 'Suite',
    className: 'devops-suite',
  },
  {
    name: 'Jira Software',
    className: 'pm-jira',
  },
  {
    name: 'GRPC',
    className: 'backend-grpc case_technologies-item__grpc',
  },
  {
    name: 'iOS',
    className: 'mobile-apple-black',
  },
  {
    name: 'UptimeRobot',
    className: 'other-uptime-robot case_technologies-item__uptime-robot',
  },
  {
    name: 'Mapbox',
    className: 'frontend-mapbox',
  },
  {
    name: 'Vue JS',
    className: 'frontend-vue',
  },
  {
    name: 'Sentry',
    className: 'devops-sentry-dark',
  },
  {
    name: 'Here Traffic',
    className: 'other-here',
  },
  {
    name: 'Basecamp',
    className: 'pm-basecamp-transparent-bg',
  },
]

export const developmentGoals = [
  {
    title: 'GPS',
    icon: 'gps',
    paragraphs: [
      'We use GPS data to track buses, and we have developed an algorithm that predicts bus travel/arrival time using a geocoding service that also calculates delays related to traffic jams and their severity. This predictor functionality calculates the estimated arrival time on specific routes. It allows our passengers to check whether their requested bus will arrive on time, considering traffic jams.',
    ],
  },
  {
    title: 'Payment method',
    icon: 'payment-method',
    paragraphs: [
      'Cashless payments are becoming more popular in Vietnam, so we have integrated Stripe service into GoDee, enabling passengers to pay with credit cards easily and quickly.',
      'We have also developed an API for flawless third-party service integration. Visa/Mastercard, AmEx, MoMo and JCB are integrated into the GoDee user app to facilitate cashless payments.',
    ],
  },
  {
    title: 'Online time-tables & live location tracking',
    icon: 'live-location-tacking',
    paragraphs: [
      'To help make the GoDee app easier to use, we created a system that tracks bus locations in real time. This means that every user can book a seat as their bus approaches their location.',
    ],
  },
  {
    title: 'Referrals',
    icon: 'referrals',
    paragraphs: [
      'To add to the commuter experience, inside the shuttle bus application, users can share referrals and get free rides as bonuses. After receiving a referral code from a referrer, the user can input the code from the booking confirmation as a promo code and enjoy one free ride. Meanwhile, referrers also receive a reward with "an “X" number of free rides.',
    ],
  },
  {
    title: 'The best possible routes',
    icon: 'possible-routes',
    paragraphs: [
      'Depending on passengers’ requests, the system allows drivers to construct the best possible routes automatically. If there are no orders from passengers, drivers will skip stops along the route.',
    ],
  },
]

export const tripsMonitorInfo = [
  'Drivers\' locations on mini map in real-time',
  'Late and early departures of buses',
  'Complete bus schedule weeks in advance',
  'Notice to driver that a GoDee client has not been picked up at a bus stop',
  'Number of passengers assigned to each stop and driver',
  'Historical information through filters',
]
