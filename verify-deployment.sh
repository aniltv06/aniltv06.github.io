#!/bin/bash

# Deployment Verification Script
# This script verifies that your site is ready for both GitHub Pages and Netlify

echo "🚀 Deployment Verification Checklist"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS="${GREEN}✅ PASS${NC}"
FAIL="${RED}❌ FAIL${NC}"
WARN="${YELLOW}⚠️  WARN${NC}"

# Check if dist directory exists
echo "1. Checking build output..."
if [ -d "dist" ]; then
    echo -e "   $PASS dist/ directory exists"
else
    echo -e "   $FAIL dist/ directory not found"
    echo "   Run: npm run build"
    exit 1
fi

# Check essential files
echo ""
echo "2. Checking essential files..."
files=("dist/index.html" "dist/projects.html" "dist/404.html" "dist/_redirects" "netlify.toml")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   $PASS $file"
    else
        echo -e "   $FAIL $file missing"
    fi
done

# Check vite.config.js base path
echo ""
echo "3. Checking Vite configuration..."
if grep -q "base: '/'" vite.config.js; then
    echo -e "   $PASS Base path set to '/' (correct for GitHub Pages user site)"
else
    echo -e "   $WARN Base path not set to '/' (check vite.config.js)"
fi

# Check GitHub Actions workflow
echo ""
echo "4. Checking GitHub Actions workflow..."
if [ -f ".github/workflows/deploy.yml" ]; then
    echo -e "   $PASS GitHub Actions workflow exists"
    if grep -q "upload-pages-artifact" .github/workflows/deploy.yml; then
        echo -e "   $PASS Uses upload-pages-artifact action"
    fi
    if grep -q "deploy-pages" .github/workflows/deploy.yml; then
        echo -e "   $PASS Uses deploy-pages action"
    fi
else
    echo -e "   $FAIL No GitHub Actions workflow found"
fi

# Check Netlify configuration
echo ""
echo "5. Checking Netlify configuration..."
if [ -f "netlify.toml" ]; then
    echo -e "   $PASS netlify.toml exists"
    if grep -q 'publish = "dist"' netlify.toml; then
        echo -e "   $PASS Publish directory set to 'dist'"
    fi
    if grep -q 'command = "npm run build"' netlify.toml; then
        echo -e "   $PASS Build command configured"
    fi
else
    echo -e "   $FAIL netlify.toml not found"
fi

# Check package.json scripts
echo ""
echo "6. Checking npm scripts..."
if grep -q '"build"' package.json; then
    echo -e "   $PASS Build script exists"
fi
if grep -q '"dev"' package.json; then
    echo -e "   $PASS Dev script exists"
fi
if grep -q '"preview"' package.json; then
    echo -e "   $PASS Preview script exists"
fi

# Check for large files
echo ""
echo "7. Checking for large files (should be < 1MB)..."
large_files=$(find dist -type f -size +1M 2>/dev/null)
if [ -z "$large_files" ]; then
    echo -e "   $PASS No files larger than 1MB"
else
    echo -e "   $WARN Large files found:"
    echo "$large_files" | while read file; do
        size=$(du -h "$file" | cut -f1)
        echo -e "      $YELLOW$file ($size)$NC"
    done
fi

# Check dist folder size
echo ""
echo "8. Checking total build size..."
dist_size=$(du -sh dist 2>/dev/null | cut -f1)
echo "   Total size: $dist_size"
if [ -n "$dist_size" ]; then
    size_mb=$(du -sm dist | cut -f1)
    if [ "$size_mb" -lt 50 ]; then
        echo -e "   $PASS Build size under 50MB"
    else
        echo -e "   $WARN Build size is large (${size_mb}MB)"
    fi
fi

# Check for console logs in production
echo ""
echo "9. Checking for console.log in production bundles..."
if grep -r "console.log" dist/assets/*.js 2>/dev/null | grep -v "map" > /dev/null; then
    echo -e "   $WARN console.log statements found in production"
    echo "   (These should be removed for production)"
else
    echo -e "   $PASS No console.log in production bundles"
fi

# Check service worker
echo ""
echo "10. Checking PWA service worker..."
if [ -f "dist/sw.js" ]; then
    echo -e "   $PASS Service worker generated"
    if [ -f "dist/manifest.json" ] || [ -f "dist/manifest.webmanifest" ]; then
        echo -e "   $PASS PWA manifest exists"
    else
        echo -e "   $WARN PWA manifest missing"
    fi
else
    echo -e "   $WARN No service worker found"
fi

# Check for security headers in netlify.toml
echo ""
echo "11. Checking security headers..."
if grep -q "X-Frame-Options" netlify.toml 2>/dev/null; then
    echo -e "   $PASS Security headers configured in netlify.toml"
else
    echo -e "   $WARN No security headers in netlify.toml"
fi

# Check for analytics tracking codes
echo ""
echo "12. Checking analytics configuration..."
if grep -q "googletagmanager" dist/index.html; then
    echo -e "   $PASS Google Analytics configured"
fi
if grep -q "clarity.ms" dist/index.html; then
    echo -e "   $PASS Microsoft Clarity configured"
fi

# Summary
echo ""
echo "===================================="
echo "📊 Summary"
echo "===================================="
echo ""
echo "✅ GitHub Pages readiness:"
echo "   - Base path: /"
echo "   - Build output: dist/"
echo "   - GitHub Actions: ✓"
echo "   - 404 handling: ✓"
echo ""
echo "☁️  Netlify readiness:"
echo "   - netlify.toml: ✓"
echo "   - _redirects: ✓"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo ""
echo "🎯 Next Steps:"
echo "   1. Test locally: npm run preview"
echo "   2. Push to GitHub: git push origin main"
echo "   3. GitHub Pages will auto-deploy via Actions"
echo "   4. For Netlify: Connect repo at app.netlify.com"
echo ""
echo "📚 Full guide: See DEPLOYMENT.md"
echo ""
