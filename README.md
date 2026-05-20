# LevelUp

You are an expert full-stack software engineer. Build a complete production-quality web app for a push-up based bodybuilding/exercise guide.

The app should currently focus only on push-up exercises, but the architecture must be scalable so that later we can add all exercise categories like pull-ups, squats, abs, cardio, dumbbells, machines, yoga, etc.

Tech stack:

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- Professional responsive UI
- Clean component structure
- Modern fitness dashboard style
- Smooth animations
- No messy inline styling unless necessary

Backend:
- Node.js
- Express.js
- TypeScript
- Object-Oriented Programming
- Scalable layered architecture
- Prisma ORM
- MySQL database
- REST API
- Proper validation
- Proper error handling
- Repository pattern
- Service layer
- Controller layer
- DTOs/interfaces
- Clean folder structure

Database:
- MySQL
- Prisma schema
- Seed data for push-up exercises
- Exercise data should come from the backend/database, not hardcoded inside UI components.

Main idea:

I want a fitness guide website where users can visually explore different push-up exercises based on target muscles. The user should be able to select one muscle group at a time, and then select multiple push-up exercises related to that muscle. The UI should filter and display only the selected muscle’s exercises.

Example target muscles:
- Chest
- Upper Chest
- Lower Chest
- Triceps
- Shoulders
- Core
- Serratus Anterior
- Full Upper Body

Example push-up exercises:
- Regular Push-Up
- Wide Push-Up
- Diamond Push-Up
- Close-Grip Push-Up
- Decline Push-Up
- Incline Push-Up
- Pike Push-Up
- Elevated Pike Push-Up
- Archer Push-Up
- Sphinx Push-Up
- Spiderman Push-Up
- T Push-Up
- Shoulder Tap Push-Up
- Hindu Push-Up
- Dive Bomber Push-Up
- Pseudo Planche Push-Up
- Scapular Push-Up
- Push-Up Plus
- Clap Push-Up

Each exercise should have:
- Exercise name
- Slug
- Description
- Primary muscle target
- Secondary muscle targets
- Difficulty: beginner/intermediate/advanced
- Recommended sets
- Recommended reps
- Rest time in seconds
- Timer duration if applicable
- Step-by-step instructions
- Common mistakes
- Benefits
- Animation/GIF/video URL placeholder
- Muscle diagram/image URL placeholder
- Equipment required, usually bodyweight/chair/bench/wall
- Created date and updated date

Frontend requirements:

Create a professional clean UI with these pages/sections:

1. Landing / Exercise Guide Page
- Hero section with title like “Push-Up Muscle Builder”
- Short subtitle explaining that users can choose target muscles and push-up variations
- CTA button to start training
- Clean white/dark professional theme, not childish
- Fitness-focused layout with cards, icons, and smooth transitions

2. Muscle Selection Section
- Display muscle cards:
  - Chest
  - Upper Chest
  - Lower Chest
  - Triceps
  - Shoulders
  - Core
  - Serratus
  - Full Upper Body
- User can select only one muscle at a time.
- Selected muscle should be visually highlighted.
- On selecting a muscle, fetch exercises for that muscle from backend.

3. Exercise Selection Section
- Show exercise cards filtered by selected muscle.
- User can select multiple exercises at once.
- Each card should show:
  - Name
  - Difficulty badge
  - Main muscle
  - Sets/reps preview
  - Small animation or placeholder preview
- Add checkbox or selectable card behavior.
- User can deselect exercises.

4. Exercise Detail / Workout Panel
For selected exercises, show detailed cards:
- Exercise animation/GIF/video placeholder
- Muscle target visual area
- Primary and secondary muscles
- Sets and reps
- Rest timer
- Start exercise button
- Start timer button
- Pause timer
- Reset timer
- Mark set complete button
- Track completed sets visually
- Instructions
- Common mistakes
- Benefits

5. Timer Functionality
- Each selected exercise should have its own timer.
- Timer should support:
  - Start
  - Pause
  - Reset
  - Complete
- Timer can be used for rest time or exercise duration.
- Show countdown visually using circular progress or progress bar.
- Do not store timer state in database for now; local frontend state is fine.

6. Visual Muscle Targeting
- For each exercise, show what muscle it targets.
- Use a placeholder body/muscle diagram image area for now.
- The UI should clearly show primary and secondary muscle chips.
- Make it easy later to replace placeholders with real SVG muscle diagrams.

7. Responsiveness
- Fully responsive for desktop, tablet, and mobile.
- Mobile should stack cards cleanly.
- No horizontal overflow.
- Use consistent spacing, typography, shadows, borders, and rounded corners.

Backend requirements:

Create a proper backend structure like:

backend/
  src/
    config/
      env.config.ts
      db.config.ts
    core/
      entities/
        Muscle.entity.ts
        Exercise.entity.ts
      interfaces/
        IMuscleRepository.ts
        IExerciseRepository.ts
    application/
      dtos/
        CreateExerciseDTO.ts
        UpdateExerciseDTO.ts
      services/
        MuscleService.ts
        ExerciseService.ts
    infrastructure/
      database/
        prisma/
          schema.prisma
          seed.ts
      repositories/
        MuscleRepository.ts
        ExerciseRepository.ts
    presentation/
      controllers/
        MuscleController.ts
        ExerciseController.ts
      routes/
        muscle.routes.ts
        exercise.routes.ts
      middleware/
        error.middleware.ts
        validate.middleware.ts
    shared/
      errors/
        AppError.ts
      response/
        ApiResponse.ts
      utils/
        asyncHandler.ts
    app.ts
    server.ts

Use OOP classes for:
- Repositories
- Services
- Controllers
- Database client/singleton if needed
- Error handling utilities

API endpoints:

Muscles:
- GET /api/muscles
  - Return all muscles

- GET /api/muscles/:slug
  - Return one muscle with details

Exercises:
- GET /api/exercises
  - Return all exercises

- GET /api/exercises?muscle=chest
  - Return exercises filtered by muscle slug

- GET /api/exercises/:slug
  - Return single exercise

- POST /api/exercises
  - Create exercise

- PATCH /api/exercises/:id
  - Update exercise

- DELETE /api/exercises/:id
  - Delete exercise

For now, admin/auth is not needed, but design backend in a way that auth can be added later.

Prisma schema requirements:

Create models:

Muscle:
- id
- name
- slug
- description
- imageUrl optional
- createdAt
- updatedAt

Exercise:
- id
- name
- slug
- description
- difficulty
- recommendedSets
- recommendedReps
- restTimeSeconds
- timerDurationSeconds optional
- animationUrl optional
- muscleImageUrl optional
- equipment
- instructions as JSON
- commonMistakes as JSON
- benefits as JSON
- createdAt
- updatedAt

ExerciseMuscle:
- id
- exerciseId
- muscleId
- type enum: PRIMARY or SECONDARY

Enums:
- Difficulty: BEGINNER, INTERMEDIATE, ADVANCED
- MuscleTargetType: PRIMARY, SECONDARY

Relationships:
- One exercise can target multiple muscles
- One muscle can belong to many exercises
- ExerciseMuscle handles primary and secondary target muscles

Seed data:

Seed all muscles and push-up exercises.

Include realistic mappings:

Regular Push-Up:
- Primary: Chest
- Secondary: Triceps, Shoulders, Core

Wide Push-Up:
- Primary: Chest
- Secondary: Shoulders

Diamond Push-Up:
- Primary: Triceps
- Secondary: Chest

Close-Grip Push-Up:
- Primary: Triceps
- Secondary: Chest

Decline Push-Up:
- Primary: Upper Chest
- Secondary: Shoulders, Triceps

Incline Push-Up:
- Primary: Lower Chest
- Secondary: Triceps

Pike Push-Up:
- Primary: Shoulders
- Secondary: Triceps, Upper Chest

Elevated Pike Push-Up:
- Primary: Shoulders
- Secondary: Triceps

Archer Push-Up:
- Primary: Chest
- Secondary: Triceps, Shoulders, Core

Sphinx Push-Up:
- Primary: Triceps
- Secondary: Core

Spiderman Push-Up:
- Primary: Core
- Secondary: Chest, Shoulders

T Push-Up:
- Primary: Core
- Secondary: Shoulders, Chest

Shoulder Tap Push-Up:
- Primary: Core
- Secondary: Chest, Shoulders

Hindu Push-Up:
- Primary: Full Upper Body
- Secondary: Chest, Shoulders, Triceps, Core

Dive Bomber Push-Up:
- Primary: Full Upper Body
- Secondary: Chest, Shoulders, Triceps

Pseudo Planche Push-Up:
- Primary: Shoulders
- Secondary: Chest, Triceps, Core

Scapular Push-Up:
- Primary: Serratus Anterior
- Secondary: Shoulders

Push-Up Plus:
- Primary: Serratus Anterior
- Secondary: Chest, Shoulders

Frontend folder structure:

frontend/
  app/
    page.tsx
    exercises/
      page.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    exercises/
      MuscleSelector.tsx
      ExerciseSelector.tsx
      ExerciseCard.tsx
      ExerciseDetailPanel.tsx
      TimerCard.tsx
      MuscleTargetVisual.tsx
      SetTracker.tsx
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx
      Progress.tsx
  lib/
    api.ts
    types.ts
    utils.ts
  hooks/
    useTimer.ts
    useExercises.ts
  styles/
    globals.css

Frontend behavior:
- Fetch muscles from backend on load.
- When user selects a muscle, call GET /api/exercises?muscle={slug}.
- Display matching exercises.
- Allow multiple exercise selection.
- Render selected exercise details below.
- Timer and set completion should work smoothly.
- Show loading states and empty states.
- Show error state if API fails.
- Use TypeScript types properly.

UI design direction:
- Professional SaaS + fitness dashboard style.
- Clean layout.
- Smooth card hover effects.
- Uniform colors.
- Modern typography.
- Use Tailwind CSS.
- Avoid random emojis.
- Use icons from lucide-react.
- Use subtle animations with framer-motion if useful.
- Color palette can be:
  - Background: #F8FAFC or dark navy
  - Primary: emerald/green
  - Accent: blue/slate
  - Cards: white
  - Text: slate/gray
- Keep spacing consistent.
- Make it look like a polished real product.

Important coding expectations:
- Do not hardcode exercise data in frontend.
- Frontend must consume backend APIs.
- Backend must use Prisma and MySQL.
- Use proper error handling.
- Use clean OOP TypeScript.
- Use repository pattern.
- Use service layer.
- Use DTOs.
- Use reusable frontend components.
- Keep code modular and scalable.
- Include comments where architecture may be confusing.
- Ensure npm scripts are added for dev/build/start.
- Include .env.example files for frontend and backend.
- Include README.md with setup instructions.

Expected deliverables:
1. Fully working backend.
2. Fully working frontend.
3. Prisma schema.
4. Seed script with push-up exercise data.
5. API routes connected properly.
6. Professional responsive UI.
7. Timer functionality.
8. Exercise filtering by muscle.
9. Multiple exercise selection.
10. Clean README.

Setup assumptions:
- Backend runs on http://localhost:5000
- Frontend runs on http://localhost:3000
- MySQL runs locally
- Backend .env should include:

DATABASE_URL="mysql://root:password@localhost:3306/pushup_builder"
PORT=5000
FRONTEND_URL="http://localhost:3000"

Frontend .env.local should include:

NEXT_PUBLIC_API_URL="http://localhost:5000/api"

Also make sure CORS allows frontend origin.

After generating the code:
- Explain the folder structure briefly.
- Tell me exact commands to install dependencies, run Prisma migration, seed database, start backend, and start frontend.
- Make sure the project can be run without hidden missing steps.