#!/bin/bash
find src -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  if grep -qE "useState|useEffect|useParams|usePathname|useData|useRouter" "$file"; then
    if ! grep -q '"use client"' "$file"; then
      sed -i '1i"use client";' "$file"
    fi
  fi
done
