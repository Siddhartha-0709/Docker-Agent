#!/bin/bash

# Docker Agent API Testing Scripts
# Base URL
BASE_URL="http://localhost:3000/api/v1"

echo "======================================"
echo "Docker Agent API Testing"
echo "======================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test endpoints
test_endpoint() {
    echo -e "\n${YELLOW}Testing: $1${NC}"
    echo "Command: $2"
    eval $2
    echo ""
}

# ============================================
# CONTAINER TESTS
# ============================================
echo -e "\n${GREEN}=== CONTAINER ENDPOINTS ===${NC}"

# 1. Get all containers
test_endpoint "Get All Containers" \
"curl -X GET '${BASE_URL}/containers/getAll' -H 'Content-Type: application/json'"

# 2. Inspect a container (replace CONTAINER_ID with actual ID)
# test_endpoint "Inspect Container" \
# "curl -X GET '${BASE_URL}/containers/inspect?id=CONTAINER_ID' -H 'Content-Type: application/json'"

# 3. Start a container
# test_endpoint "Start Container" \
# "curl -X POST '${BASE_URL}/containers/start?id=CONTAINER_ID' -H 'Content-Type: application/json'"

# 4. Stop a container
# test_endpoint "Stop Container" \
# "curl -X POST '${BASE_URL}/containers/stop?id=CONTAINER_ID' -H 'Content-Type: application/json'"

# 5. Restart a container
# test_endpoint "Restart Container" \
# "curl -X POST '${BASE_URL}/containers/restart?id=CONTAINER_ID' -H 'Content-Type: application/json'"

# 6. Remove a container
# test_endpoint "Remove Container" \
# "curl -X DELETE '${BASE_URL}/containers/remove?id=CONTAINER_ID' -H 'Content-Type: application/json'"

# ============================================
# IMAGE TESTS
# ============================================
echo -e "\n${GREEN}=== IMAGE ENDPOINTS ===${NC}"

# 1. List all images
test_endpoint "List All Images" \
"curl -X GET '${BASE_URL}/images/listImages' -H 'Content-Type: application/json'"

# 2. Run an image (creates and starts container)
# test_endpoint "Run Image" \
# "curl -X POST '${BASE_URL}/images/runImage?id=nginx:latest' -H 'Content-Type: application/json'"

# 3. Delete an image
# test_endpoint "Delete Image" \
# "curl -X DELETE '${BASE_URL}/images/deleteImage?id=IMAGE_ID' -H 'Content-Type: application/json'"

# ============================================
# NETWORK TESTS
# ============================================
echo -e "\n${GREEN}=== NETWORK ENDPOINTS ===${NC}"

# 1. List all networks
test_endpoint "List All Networks" \
"curl -X GET '${BASE_URL}/networks/networks' -H 'Content-Type: application/json'"

# 2. Get container ports
# test_endpoint "Get Container Ports" \
# "curl -X GET '${BASE_URL}/networks/ports?id=CONTAINER_ID' -H 'Content-Type: application/json'"

# 3. Get container network info
# test_endpoint "Get Container Network Info" \
# "curl -X GET '${BASE_URL}/networks/network-info?id=CONTAINER_ID' -H 'Content-Type: application/json'"

# 4. Inspect network
# test_endpoint "Inspect Network" \
# "curl -X GET '${BASE_URL}/networks/inspect?id=bridge' -H 'Content-Type: application/json'"

# ============================================
# VOLUME TESTS
# ============================================
echo -e "\n${GREEN}=== VOLUME ENDPOINTS ===${NC}"

# 1. List all volumes
test_endpoint "List All Volumes" \
"curl -X GET '${BASE_URL}/volumes/list' -H 'Content-Type: application/json'"

# 2. Delete a volume
# test_endpoint "Delete Volume" \
# "curl -X DELETE '${BASE_URL}/volumes/delete?volumeName=VOLUME_NAME' -H 'Content-Type: application/json'"

# ============================================
# WEBSOCKET TEST (requires wscat: npm install -g wscat)
# ============================================
echo -e "\n${GREEN}=== WEBSOCKET TEST ===${NC}"
echo -e "${YELLOW}To test WebSocket log streaming:${NC}"
echo "wscat -c 'ws://localhost:3001?id=CONTAINER_ID'"

echo -e "\n${GREEN}======================================"
echo "Testing Complete!"
echo "======================================${NC}"