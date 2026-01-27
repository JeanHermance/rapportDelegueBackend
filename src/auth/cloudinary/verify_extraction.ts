
// Mock CloudinaryService for testing logic
class CloudinaryService {
    extractPublicIdFromUrl(url: string): string {
        const splitUrl = url.split('/');
        const filenameWithExtension = splitUrl.pop();
        if (!filenameWithExtension) return '';

        const filename = filenameWithExtension.split('.')[0];

        // Find the index of "upload" to determine the start of the path
        const uploadIndex = splitUrl.indexOf('upload');
        if (uploadIndex === -1) return filename;

        // The folder path starts after "upload" and the version segment (e.g., v123456)
        // Check if the next segment is a version number (v + numbers)
        let pathStartIndex = uploadIndex + 1;
        if (splitUrl[pathStartIndex] && splitUrl[pathStartIndex].match(/^v\d+$/)) {
            pathStartIndex++;
        }

        const folderPath = splitUrl.slice(pathStartIndex).join('/');
        return folderPath ? `${folderPath}/${filename}` : filename;
    }
}

const service = new CloudinaryService();

const testCases = [
    {
        url: 'http://res.cloudinary.com/demo/image/upload/v12345678/uploads/images/sample.jpg',
        expected: 'uploads/images/sample',
        desc: 'Standard image URL with version and nested folder'
    },
    {
        url: 'http://res.cloudinary.com/demo/image/upload/uploads/files/document.pdf',
        expected: 'uploads/files/document',
        desc: 'File URL without version'
    },
    {
        url: 'https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg',
        expected: 'sample',
        desc: 'Root folder image with version'
    },
    {
        url: 'https://res.cloudinary.com/demo/image/upload/sample.png',
        expected: 'sample',
        desc: 'Root folder image without version'
    },
    {
        url: 'https://res.cloudinary.com/cloud_name/raw/upload/v1727339798/uploads/files/mon_fichier.pdf',
        expected: 'uploads/files/mon_fichier',
        desc: 'Raw file'
    }
];

console.log('Running Verification Tests...\n');

let passed = 0;
testCases.forEach(test => {
    const result = service.extractPublicIdFromUrl(test.url);
    if (result === test.expected) {
        console.log(`[PASS] ${test.desc}`);
        console.log(`   Input:    ${test.url}`);
        console.log(`   Output:   ${result}`);
        passed++;
    } else {
        console.error(`[FAIL] ${test.desc}`);
        console.error(`   Input:    ${test.url}`);
        console.error(`   Expected: ${test.expected}`);
        console.error(`   Actual:   ${result}`);
    }
    console.log('---');
});

console.log(`\nTests Completed: ${passed}/${testCases.length} Passed`);
