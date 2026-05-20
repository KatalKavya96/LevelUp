import "dotenv/config";
import { Difficulty, MuscleTargetType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type MuscleSeed = {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
};

type ExerciseSeed = {
  name: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  recommendedSets: number;
  recommendedReps: string;
  restTimeSeconds: number;
  timerDurationSeconds?: number;
  equipment: string;
  primaryMuscleSlug: string;
  secondaryMuscleSlugs: string[];
  instructions: string[];
  commonMistakes: string[];
  benefits: string[];
};

const visualPlaceholder = (label: string, dark = true) => {
  const background = dark ? "0f172a" : "f8fafc";
  const foreground = dark ? "34d399" : "0f172a";
  return `https://placehold.co/720x480/${background}/${foreground}?text=${encodeURIComponent(
    label
  )}`;
};

const muscles: MuscleSeed[] = [
  {
    name: "Chest",
    slug: "chest",
    description:
      "The pectoral muscles drive horizontal pressing strength and define the main push-up movement pattern.",
    imageUrl: visualPlaceholder("Chest Target", false)
  },
  {
    name: "Upper Chest",
    slug: "upper-chest",
    description:
      "The clavicular chest fibers are emphasized when the feet are elevated or the body angle shifts forward.",
    imageUrl: visualPlaceholder("Upper Chest Target", false)
  },
  {
    name: "Lower Chest",
    slug: "lower-chest",
    description:
      "The lower chest contributes strongly when the hands are elevated and the press angle is slightly declined.",
    imageUrl: visualPlaceholder("Lower Chest Target", false)
  },
  {
    name: "Triceps",
    slug: "triceps",
    description:
      "The triceps extend the elbow and become a primary driver in narrow-hand and elbow-tucked push-up variations.",
    imageUrl: visualPlaceholder("Triceps Target", false)
  },
  {
    name: "Shoulders",
    slug: "shoulders",
    description:
      "The deltoids stabilize and press the body, especially in pike, planche-lean, and rotational variations.",
    imageUrl: visualPlaceholder("Shoulders Target", false)
  },
  {
    name: "Core",
    slug: "core",
    description:
      "The core keeps the body rigid, resists rotation, and supports more athletic push-up variations.",
    imageUrl: visualPlaceholder("Core Target", false)
  },
  {
    name: "Serratus Anterior",
    slug: "serratus-anterior",
    description:
      "The serratus anterior protracts and controls the shoulder blades, helping build stable pressing mechanics.",
    imageUrl: visualPlaceholder("Serratus Target", false)
  },
  {
    name: "Full Upper Body",
    slug: "full-upper-body",
    description:
      "Compound push-up flows that challenge the chest, shoulders, triceps, core, and scapular control together.",
    imageUrl: visualPlaceholder("Full Upper Body Target", false)
  }
];

const exercises: ExerciseSeed[] = [
  {
    name: "Regular Push-Up",
    slug: "regular-push-up",
    description:
      "A foundational bodyweight press that builds chest strength while reinforcing full-body tension and clean pressing mechanics.",
    difficulty: Difficulty.BEGINNER,
    recommendedSets: 3,
    recommendedReps: "8-15",
    restTimeSeconds: 60,
    equipment: "Bodyweight",
    primaryMuscleSlug: "chest",
    secondaryMuscleSlugs: ["triceps", "shoulders", "core"],
    instructions: [
      "Start in a high plank with hands just outside shoulder width.",
      "Brace your core and keep a straight line from head to heels.",
      "Lower your chest toward the floor with elbows tracking about 30 to 45 degrees from your torso.",
      "Press the floor away until your elbows are fully extended without losing body alignment."
    ],
    commonMistakes: [
      "Letting the hips sag or pike upward.",
      "Flaring elbows straight out to the sides.",
      "Cutting the range of motion short."
    ],
    benefits: [
      "Builds baseline chest, triceps, and shoulder strength.",
      "Improves plank stability and pressing control.",
      "Scales easily for beginners and advanced athletes."
    ]
  },
  {
    name: "Wide Push-Up",
    slug: "wide-push-up",
    description:
      "A chest-focused push-up variation using a wider hand position to increase horizontal adduction demand.",
    difficulty: Difficulty.BEGINNER,
    recommendedSets: 3,
    recommendedReps: "8-12",
    restTimeSeconds: 75,
    equipment: "Bodyweight",
    primaryMuscleSlug: "chest",
    secondaryMuscleSlugs: ["shoulders"],
    instructions: [
      "Set your hands wider than shoulder width with fingers spread.",
      "Keep your ribs down and core tight before starting the descent.",
      "Lower under control until your chest approaches the floor.",
      "Drive through your palms and squeeze the chest as you return to the top."
    ],
    commonMistakes: [
      "Placing the hands so wide that the shoulders feel pinched.",
      "Losing a rigid plank position.",
      "Dropping quickly into the bottom position."
    ],
    benefits: [
      "Places greater emphasis on the chest.",
      "Builds control in a wider pressing position.",
      "Adds useful variety without equipment."
    ]
  },
  {
    name: "Diamond Push-Up",
    slug: "diamond-push-up",
    description:
      "A narrow-hand push-up that heavily challenges elbow extension strength and triceps endurance.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 3,
    recommendedReps: "6-12",
    restTimeSeconds: 90,
    equipment: "Bodyweight",
    primaryMuscleSlug: "triceps",
    secondaryMuscleSlugs: ["chest"],
    instructions: [
      "Place your hands close together under your chest, forming a diamond shape with thumbs and index fingers.",
      "Set a strong plank and tuck your elbows close to your ribs.",
      "Lower your chest toward your hands while keeping your shoulders controlled.",
      "Press up by extending your elbows and maintaining full-body tension."
    ],
    commonMistakes: [
      "Forcing the hands into a painful wrist position.",
      "Allowing elbows to flare wide.",
      "Collapsing the shoulders at the bottom."
    ],
    benefits: [
      "Targets triceps more directly than standard push-ups.",
      "Builds lockout strength.",
      "Improves narrow-grip pressing control."
    ]
  },
  {
    name: "Close-Grip Push-Up",
    slug: "close-grip-push-up",
    description:
      "A triceps-biased push-up using hands under the shoulders and tucked elbows for a joint-friendly narrow press.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 3,
    recommendedReps: "8-12",
    restTimeSeconds: 75,
    equipment: "Bodyweight",
    primaryMuscleSlug: "triceps",
    secondaryMuscleSlugs: ["chest"],
    instructions: [
      "Place your hands directly under or slightly inside shoulder width.",
      "Brace your body and point your elbow creases forward.",
      "Lower with elbows close to your sides.",
      "Press back up while keeping your shoulders away from your ears."
    ],
    commonMistakes: [
      "Shrugging into the neck during the press.",
      "Letting the elbows drift wide.",
      "Dropping the hips as fatigue builds."
    ],
    benefits: [
      "Develops triceps size and pressing endurance.",
      "Transfers well to dips and bench pressing.",
      "Often feels more comfortable than diamond push-ups."
    ]
  },
  {
    name: "Decline Push-Up",
    slug: "decline-push-up",
    description:
      "A feet-elevated push-up that shifts more load toward the upper chest and shoulders.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 4,
    recommendedReps: "6-12",
    restTimeSeconds: 90,
    equipment: "Bodyweight, chair, or bench",
    primaryMuscleSlug: "upper-chest",
    secondaryMuscleSlugs: ["shoulders", "triceps"],
    instructions: [
      "Place your feet on a stable bench or chair and your hands on the floor.",
      "Brace your core so your body forms a straight declined line.",
      "Lower your upper chest toward the floor under control.",
      "Press back to the top without letting your lower back arch."
    ],
    commonMistakes: [
      "Using an unstable foot surface.",
      "Overarching the lower back.",
      "Lowering the head instead of the chest."
    ],
    benefits: [
      "Emphasizes upper chest development.",
      "Increases total load compared with regular push-ups.",
      "Strengthens shoulders and triceps in a steeper press."
    ]
  },
  {
    name: "Incline Push-Up",
    slug: "incline-push-up",
    description:
      "A hands-elevated push-up that reduces total bodyweight load while emphasizing a lower-chest pressing angle.",
    difficulty: Difficulty.BEGINNER,
    recommendedSets: 3,
    recommendedReps: "10-18",
    restTimeSeconds: 60,
    equipment: "Wall, chair, bench, or box",
    primaryMuscleSlug: "lower-chest",
    secondaryMuscleSlugs: ["triceps"],
    instructions: [
      "Place your hands on a stable elevated surface slightly wider than your shoulders.",
      "Step back until your body forms a straight angled plank.",
      "Lower your chest toward the edge of the surface.",
      "Press back up while maintaining a controlled tempo."
    ],
    commonMistakes: [
      "Standing too close to the surface.",
      "Letting the shoulders roll forward.",
      "Rushing reps instead of owning the range."
    ],
    benefits: [
      "Excellent for beginners building push-up strength.",
      "Allows higher-quality volume with less joint stress.",
      "Targets a lower-chest pressing angle."
    ]
  },
  {
    name: "Pike Push-Up",
    slug: "pike-push-up",
    description:
      "A shoulder-dominant push-up performed with the hips high to mimic an overhead pressing pattern.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 4,
    recommendedReps: "5-10",
    restTimeSeconds: 90,
    equipment: "Bodyweight",
    primaryMuscleSlug: "shoulders",
    secondaryMuscleSlugs: ["triceps", "upper-chest"],
    instructions: [
      "Start in a downward-dog position with hips high and legs mostly straight.",
      "Bend your elbows and lower the crown of your head toward the floor between your hands.",
      "Keep your elbows angled back instead of flaring wide.",
      "Press through your palms to return to the pike position."
    ],
    commonMistakes: [
      "Turning the movement into a regular push-up.",
      "Letting elbows flare straight out.",
      "Dropping too quickly onto the head or neck."
    ],
    benefits: [
      "Builds shoulder strength without weights.",
      "Develops overhead pressing mechanics.",
      "Progresses toward handstand push-up strength."
    ]
  },
  {
    name: "Elevated Pike Push-Up",
    slug: "elevated-pike-push-up",
    description:
      "A harder pike variation with feet elevated to increase shoulder load and vertical pressing demand.",
    difficulty: Difficulty.ADVANCED,
    recommendedSets: 4,
    recommendedReps: "4-8",
    restTimeSeconds: 120,
    equipment: "Bodyweight, chair, or bench",
    primaryMuscleSlug: "shoulders",
    secondaryMuscleSlugs: ["triceps"],
    instructions: [
      "Place your feet on a stable bench and walk your hands back until your hips stack high.",
      "Keep your head neutral and your core braced.",
      "Lower your head toward the floor with controlled elbows.",
      "Press back up until your arms are straight."
    ],
    commonMistakes: [
      "Using a surface that shifts during the set.",
      "Arching the lower back to escape the shoulder load.",
      "Bouncing out of the bottom."
    ],
    benefits: [
      "Provides a strong shoulder-building stimulus.",
      "Strengthens triceps in a vertical pressing line.",
      "Bridges the gap to wall handstand push-ups."
    ]
  },
  {
    name: "Archer Push-Up",
    slug: "archer-push-up",
    description:
      "A unilateral-biased push-up where one arm handles more load while the other assists from an extended position.",
    difficulty: Difficulty.ADVANCED,
    recommendedSets: 3,
    recommendedReps: "4-8 each side",
    restTimeSeconds: 120,
    equipment: "Bodyweight",
    primaryMuscleSlug: "chest",
    secondaryMuscleSlugs: ["triceps", "shoulders", "core"],
    instructions: [
      "Set your hands wide with fingers turned slightly outward.",
      "Shift your body toward one hand as that elbow bends.",
      "Keep the opposite arm straighter as support.",
      "Press back to center and alternate or complete all reps on one side."
    ],
    commonMistakes: [
      "Rotating the torso instead of shifting smoothly.",
      "Letting the assisting shoulder collapse.",
      "Using a range of motion you cannot control."
    ],
    benefits: [
      "Builds side-to-side pressing strength.",
      "Develops control for one-arm push-up progressions.",
      "Challenges chest and core stability together."
    ]
  },
  {
    name: "Sphinx Push-Up",
    slug: "sphinx-push-up",
    description:
      "A triceps-heavy movement that starts from the forearms and presses into the hands using elbow extension.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 3,
    recommendedReps: "6-10",
    restTimeSeconds: 90,
    equipment: "Bodyweight",
    primaryMuscleSlug: "triceps",
    secondaryMuscleSlugs: ["core"],
    instructions: [
      "Start in a forearm plank with elbows under shoulders.",
      "Place your palms flat and brace your torso.",
      "Press through the hands to lift your elbows off the floor.",
      "Lower back to the forearms under control."
    ],
    commonMistakes: [
      "Rocking the hips to create momentum.",
      "Letting elbows drift outward.",
      "Losing plank tension between reps."
    ],
    benefits: [
      "Builds focused triceps strength.",
      "Improves elbow extension control.",
      "Adds variety without requiring equipment."
    ]
  },
  {
    name: "Spiderman Push-Up",
    slug: "spiderman-push-up",
    description:
      "A dynamic push-up variation that brings the knee toward the elbow to challenge anti-rotation and hip control.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 3,
    recommendedReps: "6-10 each side",
    restTimeSeconds: 90,
    equipment: "Bodyweight",
    primaryMuscleSlug: "core",
    secondaryMuscleSlugs: ["chest", "shoulders"],
    instructions: [
      "Begin in a strong high plank.",
      "As you lower, drive one knee toward the elbow on the same side.",
      "Press up while returning the foot to the starting position.",
      "Alternate sides with controlled, deliberate reps."
    ],
    commonMistakes: [
      "Swinging the leg instead of controlling it.",
      "Rotating the hips open excessively.",
      "Sacrificing push-up depth for speed."
    ],
    benefits: [
      "Trains core strength during pressing.",
      "Improves hip mobility and body control.",
      "Raises training density and athletic demand."
    ]
  },
  {
    name: "T Push-Up",
    slug: "t-push-up",
    description:
      "A push-up with a controlled side-plank rotation at the top to train pressing, core stability, and shoulder control.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 3,
    recommendedReps: "6-10 each side",
    restTimeSeconds: 90,
    equipment: "Bodyweight",
    primaryMuscleSlug: "core",
    secondaryMuscleSlugs: ["shoulders", "chest"],
    instructions: [
      "Perform a controlled push-up from a stable plank.",
      "At the top, rotate onto one hand and open your chest toward the side.",
      "Stack your shoulders and pause briefly in the T position.",
      "Return to plank and repeat on the opposite side."
    ],
    commonMistakes: [
      "Twisting quickly without control.",
      "Letting the support shoulder shrug.",
      "Allowing the feet to slide too wide or too narrow."
    ],
    benefits: [
      "Develops anti-rotation and rotational control.",
      "Builds shoulder stability.",
      "Adds core work to standard pressing volume."
    ]
  },
  {
    name: "Shoulder Tap Push-Up",
    slug: "shoulder-tap-push-up",
    description:
      "A push-up followed by alternating shoulder taps to challenge core stiffness and shoulder stability.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 3,
    recommendedReps: "8-12",
    restTimeSeconds: 75,
    equipment: "Bodyweight",
    primaryMuscleSlug: "core",
    secondaryMuscleSlugs: ["chest", "shoulders"],
    instructions: [
      "Complete a regular push-up with a steady plank.",
      "At the top, lift one hand and tap the opposite shoulder.",
      "Place the hand down and tap with the other side.",
      "Keep hips quiet before starting the next push-up."
    ],
    commonMistakes: [
      "Rocking the hips side to side.",
      "Tapping too quickly without balance.",
      "Letting the chest collapse between taps."
    ],
    benefits: [
      "Improves core stiffness under shifting support.",
      "Builds shoulder stability.",
      "Works well as a conditioning-friendly push-up variation."
    ]
  },
  {
    name: "Hindu Push-Up",
    slug: "hindu-push-up",
    description:
      "A flowing push-up variation that moves from a pike-like start through a swooping press into an extended chest position.",
    difficulty: Difficulty.INTERMEDIATE,
    recommendedSets: 3,
    recommendedReps: "6-12",
    restTimeSeconds: 90,
    equipment: "Bodyweight",
    primaryMuscleSlug: "full-upper-body",
    secondaryMuscleSlugs: ["chest", "shoulders", "triceps", "core"],
    instructions: [
      "Start with hips high, hands planted, and feet set comfortably behind you.",
      "Bend your elbows and swoop your chest forward close to the floor.",
      "Finish with your chest lifted and arms extended.",
      "Reverse or circle back to the starting position with control."
    ],
    commonMistakes: [
      "Moving too fast and losing shoulder control.",
      "Collapsing the lower back at the finish.",
      "Using a range that irritates the wrists or shoulders."
    ],
    benefits: [
      "Trains strength and mobility together.",
      "Challenges the chest, shoulders, and triceps through a long range.",
      "Adds rhythm and conditioning to upper-body sessions."
    ]
  },
  {
    name: "Dive Bomber Push-Up",
    slug: "dive-bomber-push-up",
    description:
      "A demanding flowing push-up that dives forward and returns through the same path for full upper-body strength.",
    difficulty: Difficulty.ADVANCED,
    recommendedSets: 3,
    recommendedReps: "4-8",
    restTimeSeconds: 120,
    equipment: "Bodyweight",
    primaryMuscleSlug: "full-upper-body",
    secondaryMuscleSlugs: ["chest", "shoulders", "triceps"],
    instructions: [
      "Begin in a pike position with hips high.",
      "Lower your head and chest forward as if moving under a low bar.",
      "Finish with your chest up and arms extended.",
      "Reverse the exact path to return to the pike position."
    ],
    commonMistakes: [
      "Skipping the reverse path and turning it into a Hindu push-up.",
      "Dropping weight onto the neck or wrists.",
      "Rushing through the hardest portion."
    ],
    benefits: [
      "Builds powerful shoulders and chest through a long range.",
      "Improves pressing endurance and mobility.",
      "Creates a high-skill bodyweight strength challenge."
    ]
  },
  {
    name: "Pseudo Planche Push-Up",
    slug: "pseudo-planche-push-up",
    description:
      "A forward-leaning push-up that increases shoulder and anterior chain demand while preparing for planche progressions.",
    difficulty: Difficulty.ADVANCED,
    recommendedSets: 4,
    recommendedReps: "4-8",
    restTimeSeconds: 120,
    equipment: "Bodyweight",
    primaryMuscleSlug: "shoulders",
    secondaryMuscleSlugs: ["chest", "triceps", "core"],
    instructions: [
      "Set your hands near your lower ribs or hips with fingers turned slightly outward if needed.",
      "Lean your shoulders forward past your wrists while keeping a hollow body.",
      "Lower with elbows controlled and body rigid.",
      "Press back up without losing the forward lean."
    ],
    commonMistakes: [
      "Leaning too far too soon.",
      "Letting the wrists take painful pressure.",
      "Allowing the hips to sag out of the hollow position."
    ],
    benefits: [
      "Builds intense shoulder and straight-arm strength foundations.",
      "Progresses toward planche-specific pressing.",
      "Challenges core tension throughout the set."
    ]
  },
  {
    name: "Scapular Push-Up",
    slug: "scapular-push-up",
    description:
      "A straight-arm scapular control drill that trains shoulder blade protraction and retraction without bending the elbows.",
    difficulty: Difficulty.BEGINNER,
    recommendedSets: 3,
    recommendedReps: "10-15",
    restTimeSeconds: 45,
    timerDurationSeconds: 45,
    equipment: "Bodyweight",
    primaryMuscleSlug: "serratus-anterior",
    secondaryMuscleSlugs: ["shoulders"],
    instructions: [
      "Start in a high plank with elbows locked but not hyperextended.",
      "Let your chest sink slightly as your shoulder blades move together.",
      "Push the floor away to spread your shoulder blades apart.",
      "Repeat slowly without bending your elbows."
    ],
    commonMistakes: [
      "Turning it into a regular push-up.",
      "Moving from the hips instead of the shoulder blades.",
      "Shrugging the shoulders toward the ears."
    ],
    benefits: [
      "Improves scapular control for stronger push-ups.",
      "Targets the serratus anterior directly.",
      "Supports healthier shoulder mechanics."
    ]
  },
  {
    name: "Push-Up Plus",
    slug: "push-up-plus",
    description:
      "A regular push-up with an extra protraction at the top to emphasize serratus anterior activation.",
    difficulty: Difficulty.BEGINNER,
    recommendedSets: 3,
    recommendedReps: "8-15",
    restTimeSeconds: 60,
    equipment: "Bodyweight",
    primaryMuscleSlug: "serratus-anterior",
    secondaryMuscleSlugs: ["chest", "shoulders"],
    instructions: [
      "Perform a regular push-up with a rigid plank.",
      "At the top, keep your elbows straight and push the floor farther away.",
      "Feel your shoulder blades spread around your rib cage.",
      "Return to the normal top position before the next rep."
    ],
    commonMistakes: [
      "Bending the elbows during the plus phase.",
      "Over-rounding the upper back aggressively.",
      "Losing core tension at the top."
    ],
    benefits: [
      "Adds serratus work to a familiar push-up.",
      "Improves shoulder blade movement quality.",
      "Supports better lockout strength and control."
    ]
  },
  {
    name: "Clap Push-Up",
    slug: "clap-push-up",
    description:
      "An explosive push-up variation that develops upper-body power by pressing forcefully enough for the hands to leave the floor.",
    difficulty: Difficulty.ADVANCED,
    recommendedSets: 4,
    recommendedReps: "3-6",
    restTimeSeconds: 120,
    equipment: "Bodyweight",
    primaryMuscleSlug: "chest",
    secondaryMuscleSlugs: ["triceps", "shoulders", "core"],
    instructions: [
      "Start in a strong push-up position with hands under the shoulders.",
      "Lower under control to a comfortable depth.",
      "Explode upward so your hands leave the floor.",
      "Clap quickly if you can land safely, then absorb the landing with soft elbows."
    ],
    commonMistakes: [
      "Attempting the clap before building enough push-up strength.",
      "Landing with locked elbows.",
      "Letting the core go loose during takeoff or landing."
    ],
    benefits: [
      "Develops explosive pressing power.",
      "Improves fast-twitch upper-body output.",
      "Adds a performance-focused advanced progression."
    ]
  }
];

const main = async () => {
  await prisma.exerciseMuscle.deleteMany();
  await prisma.exercise.deleteMany();

  for (const muscle of muscles) {
    await prisma.muscle.upsert({
      where: { slug: muscle.slug },
      update: muscle,
      create: muscle
    });
  }

  const muscleRecords = await prisma.muscle.findMany();
  const muscleBySlug = new Map(
    muscleRecords.map((muscle) => [muscle.slug, muscle])
  );

  for (const exercise of exercises) {
    const createdExercise = await prisma.exercise.create({
      data: {
        name: exercise.name,
        slug: exercise.slug,
        description: exercise.description,
        difficulty: exercise.difficulty,
        recommendedSets: exercise.recommendedSets,
        recommendedReps: exercise.recommendedReps,
        restTimeSeconds: exercise.restTimeSeconds,
        timerDurationSeconds: exercise.timerDurationSeconds ?? null,
        animationUrl: visualPlaceholder(exercise.name),
        muscleImageUrl: visualPlaceholder(`${exercise.name} Muscle Map`, false),
        equipment: exercise.equipment,
        instructions: exercise.instructions,
        commonMistakes: exercise.commonMistakes,
        benefits: exercise.benefits
      }
    });

    const targetSlugs = [
      {
        slug: exercise.primaryMuscleSlug,
        type: MuscleTargetType.PRIMARY
      },
      ...exercise.secondaryMuscleSlugs.map((slug) => ({
        slug,
        type: MuscleTargetType.SECONDARY
      }))
    ];

    await prisma.exerciseMuscle.createMany({
      data: targetSlugs.map((target) => {
        const muscle = muscleBySlug.get(target.slug);

        if (!muscle) {
          throw new Error(`Missing muscle seed '${target.slug}'`);
        }

        return {
          exerciseId: createdExercise.id,
          muscleId: muscle.id,
          type: target.type
        };
      })
    });
  }

  console.log(
    `Seeded ${muscles.length} muscles and ${exercises.length} push-up exercises.`
  );
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
