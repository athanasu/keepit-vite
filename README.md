<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]

<!-- ABOUT THE PROJECT -->

## About The Project

**Keepit** is a CRUD application designed for language learners who want to improve their vocabulary. With Keepit, users can save words along with their translations to their mother language, making it easy to review and remember new vocabulary. The application also includes a flashcards page where users can test their memory and retention of the words they've saved.

Keepit has been my go-to project for testing out different technologies. I have already implemented it using tech stacks such as:

1.  [CRA](https://create-react-app.dev/) + [Laravel](https://laravel.com/) + [Fauna](https://fauna.com/)
2.  [Laravel + blade templates](https://laravel.com/docs/10.x/blade)
3.  [Next.js](https://nextjs.org/)
4.  [Remix.run](https://remix.run/)

This time I wanted to try [Vite](https://vitejs.dev/), [Netlify Functions](https://docs.netlify.com/functions/overview/), [Prisma ORM](https://www.prisma.io/) and [PlanetScale](https://planetscale.com/) to build and maintain the application.

<br />

<!-- TECH USED -->

### Built With

[![Vite][Vite]][Vite-url] [![React][React.js]][React-url] [![Typescript][Typescript]][Typescript-url] [![Zod][Zod]][Zod-url] [![TanStack Query][TanStack Query]][TanStack-url] [![@total-typescript/ts-reset][@total-typescript/ts-reset]][TsReset-url] [![Vitest][Vitest]][Vitest-url] [![ReactRouter][ReactRouter]][ReactRouter-url] [![Mantine][Mantine]][Mantine-url] [![PlanetScale][PlanetScale]][PlanetScale-url] [![Prisma][Prisma]][Prisma-url] [![Netlify][Netlify]][Netlify-url] [![MSW][MSW]][MSW-url]

<br />

<!-- GETTING STARTED -->

## Getting Started

<!-- PREREQUISITES -->

### Prerequisites

1. [yarn](https://yarnpkg.com/): `npm install yarn -g`
2. [Netlify CLI](https://docs.netlify.com/cli/get-started/): `npm install netlify-cli -g`

<!-- INSTALLATION -->

### Installation

1. Clone the repo: `git clone https://github.com/athanasu/keepit-vite.git`
2. Move into the folder: `cd ./keepit-vite`
3. Install packages: `yarn`
4. Create the .env file: `cp .env-example .env`
5. Create a PlanetScale account and create the `Keepit_Translation` table:

   ```
   CREATE TABLE `Keepit_Translation` (
   	`id` int NOT NULL AUTO_INCREMENT,
   	`createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
   	`updatedAt` datetime(3) NOT NULL,
   	`from` varchar(255) NOT NULL,
   	`to` varchar(255) NOT NULL,
   	`notes` varchar(255) NOT NULL,
   	PRIMARY KEY (`id`)
   ) ENGINE InnoDB,
   CHARSET utf8mb4,
   COLLATE utf8mb4_unicode_ci;
   ```

6. Update the `.env` file with the `DATABASE_URL` credentials `NODE_ENV` of your preference or set the `VITE_RUN_MSW` to true to run the mock server.
7. Run the app: `netlify dev`

<br />

<!-- USAGE -->

## Usage

You can run the application in 2 modes by setting the `VITE_RUN_MSW` value in the `.env` file:

1. `VITE_RUN_MSW={any}`: Run the local server which connects to the `DATABASE_URL` you specified
2. `VITE_RUN_MSW="true"`: Run the mock server. Even if you haven't completed the PlanetScale setup, the `msw` mode will run the application with mocked data

<br />

<!-- Build and Deploy -->

## Build and Deploy

I used [Netlify CLI](https://docs.netlify.com/cli/get-started/) to build and deploy the example app. Steps I followed:

1. `ntl sites:list`
2. `ntl link`
3. `ntl env:set VITE_RUN_MSW "true"`
4. `ntl deploy --prod`

<br />

<!-- DEMO -->

## Demo

An example of the application in `msw` mode can be found [here](https://keepit-vite-demo.netlify.app/).

<br />

<!-- ROADMAP -->

## Roadmap

- [ ] [Supabase](https://supabase.com/) integration for authentication

<br />

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<br />

<!-- CONTACT -->

## Contact

LinkedIn: [Giorgos Athanasoulias](https://www.linkedin.com/in/athanasu/)  
Website: [https://athanasu.com](https://athanasu.com)

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->

[license-shield]: https://img.shields.io/badge/MIT%20Licence-white?style=for-the-badge&logo=bookstack&colorB=555&logoColor=fff
[license-url]: https://github.com/athanasu/keepit-vite/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/athanasu/
[React.js]: https://img.shields.io/badge/React-fff?style=for-the-badge&logo=react&logoColor=black
[React-url]: https://reactjs.org/
[Vite]: https://img.shields.io/badge/Vite-fff?style=for-the-badge&logo=vite&logoColor=black
[Vite-url]: https://vitejs.dev/
[Typescript]: https://img.shields.io/badge/Typescript-fff?style=for-the-badge&logo=typescript&logoColor=black
[Typescript-url]: https://www.typescriptlang.org/
[Zod]: https://img.shields.io/badge/Zod-fff?style=for-the-badge
[Zod-url]: https://zod.dev/
[TanStack Query]: https://img.shields.io/badge/TanStack%20Query-fff?style=for-the-badge&&logo=reactquery&logoColor=black
[TanStack-url]: https://tanstack.com/query/latest/
[@total-typescript/ts-reset]: https://img.shields.io/badge/ts%20reset-fff?style=for-the-badge&&logo=ts-node&logoColor=black
[TsReset-url]: https://github.com/total-typescript/ts-reset
[Vitest]: https://img.shields.io/badge/vitest-fff?style=for-the-badge&&logo=vitest&logoColor=black
[Vitest-url]: https://vitest.dev/
[ReactRouter]: https://img.shields.io/badge/React%20Router-fff?style=for-the-badge&&logo=reactrouter&logoColor=black
[ReactRouter-url]: https://reactrouter.com/en/main
[Mantine]: https://img.shields.io/badge/Mantine-fff?style=for-the-badge&logo=css3&logoColor=black
[Mantine-url]: https://mantine.dev
[PlanetScale]: https://img.shields.io/badge/PlanetScale-fff?style=for-the-badge&logo=planetscale&logoColor=black
[PlanetScale-url]: https://planetscale.com/
[Prisma]: https://img.shields.io/badge/Prisma-fff?style=for-the-badge&logo=prisma&logoColor=black
[Prisma-url]: https://www.prisma.io/
[Netlify]: https://img.shields.io/badge/Netlify-fff?style=for-the-badge&logo=netlify&logoColor=black
[Netlify-url]: https://docs.netlify.com/functions/overview/
[MSW]: https://img.shields.io/badge/MSW-fff?style=for-the-badge&logo=msw&logoColor=black
[MSW-url]: https://mswjs.io/
