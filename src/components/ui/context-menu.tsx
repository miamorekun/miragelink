// "use client"

// import * as React from "react"
// import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"

// import {cn} from "@/utils/helpers/shadcn-ui"

// const ContextMenu = ContextMenuPrimitive.Root

// const ContextMenuTrigger = ContextMenuPrimitive.Trigger

// const ContextMenuGroup = ContextMenuPrimitive.Group

// const ContextMenuPortal = ContextMenuPrimitive.Portal

// const ContextMenuSub = ContextMenuPrimitive.Sub

// const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

// const ContextMenuSubTrigger = React.forwardRef<
// 	React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
// 	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
// 		inset?: boolean
// 	}
// >(({className, inset, children, ...props}, ref) => (
// 	<ContextMenuPrimitive.SubTrigger
// 		ref={ref}
// 		className={cn(
// 			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[state=open]:bg-gray-800 dark:data-[state=open]:text-gray-50",
// 			inset && "pl-8",
// 			className,
// 		)}
// 		{...props}>
// 		{children}
// 		<ChevronRight className="ml-auto h-4 w-4" />
// 	</ContextMenuPrimitive.SubTrigger>
// ))
// ContextMenuSubTrigger.display_name = ContextMenuPrimitive.SubTrigger.display_name

// const ContextMenuSubContent = React.forwardRef<
// 	React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
// 	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
// >(({className, ...props}, ref) => (
// 	<ContextMenuPrimitive.SubContent
// 		ref={ref}
// 		className={cn(
// 			"z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50",
// 			className,
// 		)}
// 		{...props}
// 	/>
// ))
// ContextMenuSubContent.display_name = ContextMenuPrimitive.SubContent.display_name

// const ContextMenuContent = React.forwardRef<
// 	React.ElementRef<typeof ContextMenuPrimitive.Content>,
// 	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
// >(({className, ...props}, ref) => (
// 	<ContextMenuPrimitive.Portal>
// 		<ContextMenuPrimitive.Content
// 			ref={ref}
// 			className={cn(
// 				"z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50",
// 				className,
// 			)}
// 			{...props}
// 		/>
// 	</ContextMenuPrimitive.Portal>
// ))
// ContextMenuContent.display_name = ContextMenuPrimitive.Content.display_name

// const ContextMenuItem = React.forwardRef<
// 	React.ElementRef<typeof ContextMenuPrimitive.Item>,
// 	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
// 		inset?: boolean
// 	}
// >(({className, inset, ...props}, ref) => (
// 	<ContextMenuPrimitive.Item
// 		ref={ref}
// 		className={cn(
// 			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
// 			inset && "pl-8",
// 			className,
// 		)}
// 		{...props}
// 	/>
// ))
// ContextMenuItem.display_name = ContextMenuPrimitive.Item.display_name

// const ContextMenuCheckboxItem = React.forwardRef<
// 	React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
// 	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
// >(({className, children, checked, ...props}, ref) => (
// 	<ContextMenuPrimitive.CheckboxItem
// 		ref={ref}
// 		className={cn(
// 			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
// 			className,
// 		)}
// 		checked={checked}
// 		{...props}>
// 		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
// 			<ContextMenuPrimitive.ItemIndicator>
// 				<Check className="h-4 w-4" />
// 			</ContextMenuPrimitive.ItemIndicator>
// 		</span>
// 		{children}
// 	</ContextMenuPrimitive.CheckboxItem>
// ))
// ContextMenuCheckboxItem.display_name = ContextMenuPrimitive.CheckboxItem.display_name

// const ContextMenuRadioItem = React.forwardRef<
// 	React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
// 	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
// >(({className, children, ...props}, ref) => (
// 	<ContextMenuPrimitive.RadioItem
// 		ref={ref}
// 		className={cn(
// 			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
// 			className,
// 		)}
// 		{...props}>
// 		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
// 			<ContextMenuPrimitive.ItemIndicator>
// 				<Circle className="h-2 w-2 fill-current" />
// 			</ContextMenuPrimitive.ItemIndicator>
// 		</span>
// 		{children}
// 	</ContextMenuPrimitive.RadioItem>
// ))
// ContextMenuRadioItem.display_name = ContextMenuPrimitive.RadioItem.display_name

// const ContextMenuLabel = React.forwardRef<
// 	React.ElementRef<typeof ContextMenuPrimitive.Label>,
// 	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
// 		inset?: boolean
// 	}
// >(({className, inset, ...props}, ref) => (
// 	<ContextMenuPrimitive.Label
// 		ref={ref}
// 		className={cn(
// 			"px-2 py-1.5 text-sm font-semibold text-gray-950 dark:text-gray-50",
// 			inset && "pl-8",
// 			className,
// 		)}
// 		{...props}
// 	/>
// ))
// ContextMenuLabel.display_name = ContextMenuPrimitive.Label.display_name

// const ContextMenuSeparator = React.forwardRef<
// 	React.ElementRef<typeof ContextMenuPrimitive.Separator>,
// 	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
// >(({className, ...props}, ref) => (
// 	<ContextMenuPrimitive.Separator
// 		ref={ref}
// 		className={cn("-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800", className)}
// 		{...props}
// 	/>
// ))
// ContextMenuSeparator.display_name = ContextMenuPrimitive.Separator.display_name

// const ContextMenuShortcut = ({className, ...props}: React.HTMLAttributes<HTMLSpanElement>) => {
// 	return (
// 		<span
// 			className={cn("ml-auto text-xs tracking-widest text-gray-500 dark:text-gray-400", className)}
// 			{...props}
// 		/>
// 	)
// }
// ContextMenuShortcut.display_name = "ContextMenuShortcut"

// export {
// 	ContextMenu,
// 	ContextMenuTrigger,
// 	ContextMenuContent,
// 	ContextMenuItem,
// 	ContextMenuCheckboxItem,
// 	ContextMenuRadioItem,
// 	ContextMenuLabel,
// 	ContextMenuSeparator,
// 	ContextMenuShortcut,
// 	ContextMenuGroup,
// 	ContextMenuPortal,
// 	ContextMenuSub,
// 	ContextMenuSubContent,
// 	ContextMenuSubTrigger,
// 	ContextMenuRadioGroup,
// }
