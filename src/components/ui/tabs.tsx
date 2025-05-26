"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import {cn} from "@/utils/helpers/shadcn-ui"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn("flex items-center gap-x-4 border-b border-gray-200", className)}
		{...props}
	/>
))
TabsList.display_name = TabsPrimitive.List.display_name

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({className, ...props}, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"inline-flex items-center justify-center whitespace-nowrap min-w-9 pb-2 -mb-px",
			"text-sm",
			"transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
			"border-b border-transparent text-gray-500 hover:text-gray-950 data-[state=active]:border-gray-900 data-[state=active]:text-gray-950",
			className,
		)}
		{...props}
	/>
))
TabsTrigger.display_name = TabsPrimitive.Trigger.display_name

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...props}, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn("focus-visible:outline-none", className)}
		{...props}
	/>
))
TabsContent.display_name = TabsPrimitive.Content.display_name

export {Tabs, TabsList, TabsTrigger, TabsContent}
