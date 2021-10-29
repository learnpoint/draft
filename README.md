# Draft

*Draft is a template for writing Learnpoint design drafts.*

### Requirements

1. [Deno](https://deno.land/manual/getting_started/installation)
2. [Piko](https://github.com/learnpoint/piko)

### Using Draft

Let's say you want to draft a new idea for a Learnpoint dashboard...

1. Create a new draft named ```dashboard-idea```:

    ```bash
    $ piko copy learnpoint/draft dashboard-idea
    ```

    This command will create a new folder named ```dashboard-idea``` and copy the files from ```learnpoint/draft``` into that folder.

2. Move into the created folder:

    ```bash
    $ cd dashboard-idea
    ```

3. Start the Piko dev server:

    ```bash
    $ piko dev
    ```

4. Navigate to ```http://127.0.0.1:3333```.

5. Open your editor and write your draft in ```dashboard-idea/src```.

### Contributing

If you don't want to make a new draft, but instead want to improve this template, then create a fork of this repo, write your improvements, and make a pull request.
