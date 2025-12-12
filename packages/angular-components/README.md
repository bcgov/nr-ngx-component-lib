# nr-ngx-component-lib Angular Components
NR Component Library for Angular.

# Development 
In order to do development on this library, first start a local build of Storybook.
First open a terminal, and change to this folder in your local checkout.

```shell
> npm install
> npm start
```

Open [Storybook](http://localhost:6006/?path=/story).
Now you can test any component while you make changes to it.

# Deployment
Follow these steps to deploy a new build of this library.

- Use storybook to ensure that everything is working properly.
- Increase the version number in `projects/nr-ngx-component-lib/package.json` .
- Commit changes to a branch.
- Make a PR to merge that branch to main.
- After PR is approved, checkout main.
- Build the package:

    ```shell
    > npm run build
    ```

- If there are no errors, then publish the package:

    ```shell
    > cd dist/nr-ngx-component-lib
    > npm publish --access public
    ```

- Done!
