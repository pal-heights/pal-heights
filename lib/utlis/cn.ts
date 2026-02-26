type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const push = (value: ClassValue): void => {
    if (!value) return;

    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(push);
      return;
    }

    if (typeof value === "object") {
      for (const key in value) {
        if (value[key]) classes.push(key);
      }
    }
  };

  inputs.forEach(push);

  return classes.join(" ");
}
