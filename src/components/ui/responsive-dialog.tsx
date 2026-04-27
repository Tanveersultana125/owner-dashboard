import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type RootProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const ResponsiveDialogContext = React.createContext<{ isMobile: boolean }>({ isMobile: false });

function ResponsiveDialog({ open, onOpenChange, children }: RootProps) {
  const isMobile = useIsMobile();
  const ctx = React.useMemo(() => ({ isMobile }), [isMobile]);
  const Root = isMobile ? Drawer : Dialog;
  return (
    <ResponsiveDialogContext.Provider value={ctx}>
      <Root open={open} onOpenChange={onOpenChange}>
        {children}
      </Root>
    </ResponsiveDialogContext.Provider>
  );
}

function ResponsiveDialogTrigger(
  props: React.ComponentPropsWithoutRef<typeof DialogTrigger>,
) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);
  const Comp = isMobile ? DrawerTrigger : DialogTrigger;
  return <Comp {...props} />;
}

const ResponsiveDialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => {
  const { isMobile } = React.useContext(ResponsiveDialogContext);
  if (isMobile) {
    return (
      <DrawerContent
        ref={ref}
        className={cn(
          "max-h-[92svh] pb-[env(safe-area-inset-bottom)] focus:outline-none",
          className,
        )}
        {...(props as any)}
      >
        <div className="overflow-y-auto px-4 pb-4">{children}</div>
      </DrawerContent>
    );
  }
  return (
    <DialogContent
      ref={ref}
      className={cn("max-h-[90vh] overflow-y-auto", className)}
      {...props}
    >
      {children}
    </DialogContent>
  );
});
ResponsiveDialogContent.displayName = "ResponsiveDialogContent";

function ResponsiveDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);
  const Comp = isMobile ? DrawerHeader : DialogHeader;
  return <Comp className={cn(className)} {...props} />;
}

function ResponsiveDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);
  const Comp = isMobile ? DrawerFooter : DialogFooter;
  return <Comp className={cn(className)} {...props} />;
}

const ResponsiveDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, ...props }, ref) => {
  const { isMobile } = React.useContext(ResponsiveDialogContext);
  const Comp = isMobile ? DrawerTitle : DialogTitle;
  return <Comp ref={ref} className={cn(className)} {...(props as any)} />;
});
ResponsiveDialogTitle.displayName = "ResponsiveDialogTitle";

const ResponsiveDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, ...props }, ref) => {
  const { isMobile } = React.useContext(ResponsiveDialogContext);
  const Comp = isMobile ? DrawerDescription : DialogDescription;
  return <Comp ref={ref} className={cn(className)} {...(props as any)} />;
});
ResponsiveDialogDescription.displayName = "ResponsiveDialogDescription";

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
};
