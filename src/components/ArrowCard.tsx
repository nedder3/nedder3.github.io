import { formatDate } from "@lib/utils"
import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects">
  pill?: boolean
}

export default function ArrowCard({entry, pill}: Props) {
    return (
      <a href={`/${entry.collection}/${entry.slug}`} class="group p-4 gap-3 flex items-center border rounded-xl bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-850/80 border-slate-200 dark:border-slate-800/80 hover:border-sky-500/50 dark:hover:border-sky-400/50 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      <div class="w-full">
        <div class="flex flex-wrap items-center gap-2">
          {pill &&
            <div class="text-xs uppercase font-medium px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {entry.collection === "blog" ? "Architecture Note" : "System Project"}
            </div>
          }
          <div class="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">
            {formatDate(entry.data.date)}
          </div>
        </div>
        <div class="font-semibold mt-2.5 text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
          {entry.data.title}
        </div>

        <div class="text-sm line-clamp-2 text-slate-600 dark:text-slate-400 mt-1">
          {entry.data.summary}
        </div>
        <ul class="flex flex-wrap mt-3 gap-1.5">
          {entry.data.tags.map((tag: string) => (
            <li class="text-[11px] font-mono tracking-wide py-0.5 px-2 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/50">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-slate-400 group-hover:stroke-sky-500 dark:group-hover:stroke-sky-400 shrink-0 transition-colors duration-200">
        <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </svg>
    </a>
   )
}
