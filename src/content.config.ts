import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const papers = defineCollection({
	loader: glob({ base: './src/content/papers', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		authors: z.string(),
		venue: z.string(),
		year: z.number(),
		status: z.string().optional(), // e.g. "in press", "under review"
		paperurl: z.string().optional(),
		links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
		note: z.string().optional(), // selected-contribution tag
		order: z.number().default(0),
	}),
});

const talks = defineCollection({
	loader: glob({ base: './src/content/talks', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		authors: z.string().optional(),
		type: z.string(), // Oral presentation / Poster
		venue: z.string(),
		location: z.string().optional(),
		date: z.coerce.date(),
		video: z.string().optional(),
		award: z.string().optional(),
	}),
});

const research = defineCollection({
	loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		blurb: z.string(),
		status: z.string().optional(),
		links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
		order: z.number().default(0),
	}),
});


export const collections = { papers, talks, research };
