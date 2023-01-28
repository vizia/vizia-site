export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')];

export const server_loads = [];

export const dictionary = {
	"/": [4],
	"/about": [5],
	"/blog": [6],
	"/blog/[...blogPage]": [7],
	"/examples": [8],
	"/faq": [9],
	"/guide": [10,[2]],
	"/guide/[...docsPage]": [11,[2]],
	"/tutorial": [12,[3]],
	"/tutorial/[...tutorialPage]": [13,[3]]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};