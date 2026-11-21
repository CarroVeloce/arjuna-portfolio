#!/usr/bin/env python3
"""
verify_deployment.py
Automated End-to-End Verification Suite for Arjuna Dwi Damara Putra Portfolio Website.

Validates:
1. Local repository file structure and asset completeness.
2. Public deployment HTTP 200 response on GitHub Pages.
3. Content integrity against all required profile, education, experience, and project data.
4. Linked static assets (CSS, JS, Favicon) loading status.
5. Responsive mobile viewport configuration.
"""

import os
import sys
import time
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup

TARGET_URL = "https://carroveloce.github.io/arjuna-portfolio/"
MAX_ATTEMPTS = 30
SLEEP_INTERVAL = 5

REQUIRED_FILES = [
    "index.html",
    os.path.join("css", "style.css"),
    os.path.join("js", "main.js"),
    ".nojekyll",
    "README.md",
]

REQUIRED_STRINGS = [
    "Arjuna Dwi Damara Putra",
    "Machine Learning Engineer",
    "PT Salam Pacific Indonesia Lines",
    "VeggieVision",
    "Pest Busters",
    "Politeknik Negeri Jakarta",
    "SMK Negeri 9",
    "DeepLearning.AI TensorFlow Developer",
    "Bangkit Academy",
    "Associate Data Scientist",
    "0851-5692-2833",
    "damararjuna819@gmail.com",
    "Petukangan Utara",
]


def verify_local_files():
    print("[*] STEP 1: Verifying local file structure...")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    missing_files = []

    for rel_path in REQUIRED_FILES:
        full_path = os.path.join(base_dir, rel_path)
        if os.path.isfile(full_path):
            size = os.path.getsize(full_path)
            print(f"  [+] Found file: {rel_path} ({size} bytes)")
        else:
            print(f"  [-] MISSING file: {rel_path}")
            missing_files.append(rel_path)

    if missing_files:
        print(f"[-] ERROR: Missing {len(missing_files)} required local files.")
        return False
    print("[+] Local workspace files verified successfully.\n")
    return True


def poll_live_url():
    print(f"[*] STEP 2: Polling public URL: {TARGET_URL} for HTTP 200...")
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            resp = requests.get(TARGET_URL, timeout=12, headers={"User-Agent": "PortfolioVerifier/1.0"})
            print(f"    Attempt {attempt:02d}/{MAX_ATTEMPTS}: HTTP Status {resp.status_code}")
            if resp.status_code == 200:
                print(f"[+] Successfully reached live site on attempt {attempt}!\n")
                return resp
        except requests.exceptions.RequestException as e:
            print(f"    Attempt {attempt:02d}/{MAX_ATTEMPTS}: Connection attempt error: {e}")
        time.sleep(SLEEP_INTERVAL)

    print("[-] ERROR: Timed out waiting for public URL to return HTTP 200.")
    return None


def verify_html_content(html_text):
    print("[*] STEP 3: Verifying required content strings...")
    missing_strings = []
    html_lower = html_text.lower()

    for item in REQUIRED_STRINGS:
        if item.lower() in html_lower:
            print(f"  [+] Content verified: '{item}'")
        else:
            print(f"  [-] Content MISSING: '{item}'")
            missing_strings.append(item)

    if missing_strings:
        print(f"[-] ERROR: Missing {len(missing_strings)} required content strings!")
        return False

    print("[+] All profile and technical content verified successfully.\n")
    return True


def verify_assets_and_metadata(response):
    print("[*] STEP 4: Verifying responsive meta tags and linked assets...")
    soup = BeautifulSoup(response.text, "html.parser")

    # Viewport check
    viewport = soup.find("meta", attrs={"name": "viewport"})
    if viewport and "width=device-width" in viewport.get("content", ""):
        print("  [+] Viewport meta tag verified: 'width=device-width' present.")
    else:
        print("  [-] ERROR: Responsive viewport meta tag is missing or incorrect.")
        return False

    # Collect linked asset URLs
    asset_urls = []
    for link in soup.find_all("link", rel="stylesheet"):
        href = link.get("href")
        if href and not href.startswith("http"):
            asset_urls.append(urljoin(TARGET_URL, href))
        elif href:
            asset_urls.append(href)

    for script in soup.find_all("script"):
        src = script.get("src")
        if src and not src.startswith("http"):
            asset_urls.append(urljoin(TARGET_URL, src))
        elif src:
            asset_urls.append(src)

    print(f"  Found {len(asset_urls)} linked asset(s) to verify:")
    failed_assets = []

    for url in asset_urls:
        try:
            ar = requests.get(url, timeout=10, headers={"User-Agent": "PortfolioVerifier/1.0"})
            if ar.status_code == 200:
                print(f"  [+] Asset OK (HTTP 200): {url}")
            else:
                print(f"  [-] Asset FAILED (HTTP {ar.status_code}): {url}")
                failed_assets.append((url, ar.status_code))
        except requests.exceptions.RequestException as ex:
            print(f"  [-] Asset ERROR ({ex}): {url}")
            failed_assets.append((url, str(ex)))

    if failed_assets:
        print(f"[-] ERROR: {len(failed_assets)} asset(s) failed to load.")
        return False

    print("[+] All assets and metadata verified successfully.\n")
    return True


def main():
    print("=" * 70)
    print("  ARJUNA DWI DAMARA PUTRA — PORTFOLIO DEPLOYMENT VERIFICATION")
    print("=" * 70)

    # 1. Local verification
    if not verify_local_files():
        sys.exit(1)

    # 2. Public deployment polling
    response = poll_live_url()
    if not response:
        sys.exit(1)

    # 3. Content integrity
    if not verify_html_content(response.text):
        sys.exit(1)

    # 4. Assets and responsiveness
    if not verify_assets_and_metadata(response):
        sys.exit(1)

    print("=" * 70)
    print("  ALL VERIFICATION CHECKS PASSED: DEPLOYMENT IS LIVE AND HEALTHY!")
    print(f"  Live URL: {TARGET_URL}")
    print("=" * 70)
    sys.exit(0)


if __name__ == "__main__":
    main()
