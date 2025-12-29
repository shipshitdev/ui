#!/bin/bash
# Build script that filters API Extractor TypeScript version warnings

BUILD_LIBRARY=true vite build 2>&1 | grep -v 'consider upgrading API Extractor' | grep -v 'Analysis will use the bundled TypeScript version'
exit ${PIPESTATUS[0]}
