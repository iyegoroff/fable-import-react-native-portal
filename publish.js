#!/usr/bin/env node

const fs = require('fs');
const {exec} = require('child_process');
const {promisify} = require('util');

const packageName = 'Fable.Import.ReactNativePortal';
const fsprojPath = `./src/${packageName}/${packageName}.fsproj`;
const versionMatcher = /<Version>(\d+)\.(\d+)\.(\d+)<\/Version>/m;

const usage = () => {
  console.log('Usage: ./publish.js [patch|minor|major]\n');
};

const publish = async (bumpStrategy) => {
  const fsproj = (await promisify(fs.readFile)(fsprojPath)).toString();

  const [, major, minor, patch] = fsproj.match(versionMatcher);

  const nextVersion = bumpStrategy === 'patch'
    ? `${major}.${minor}.${+patch + 1}`
    : bumpStrategy === 'minor'
    ? `${major}.${+minor + 1}.0`
    : `${+major + 1}.0.0`;

  const nextFsproj = fsproj.replace(versionMatcher, `<Version>${nextVersion}</Version>`);

  await promisify(fs.writeFile)(fsprojPath, nextFsproj);

  await promisify(exec)(`rm -rf ./src/${packageName}/{bin,obj}`);
  // await promisify(exec)(`cd src/${packageName} && dotnet pack -c Release`);
  // await promisify(exec)(`cd src/${packageName} && dotnet nuget push --source nuget.org -k \${NUGET_KEY} bin/Release/${packageName}.${nextVersion}.nupkg`);
  await promisify(exec)(`git add -A . && git commit -am 'version ${nextVersion}' && git push && git tag 'v${nextVersion}' && git push origin --tags`);

};

const args = process.argv;

const versionIsInvalid = args[2] ?
  !/^(patch|minor|major)$/.test(args[2]) :
  false;

if (versionIsInvalid) {
  usage();
} else {
  publish(args[2]);
}