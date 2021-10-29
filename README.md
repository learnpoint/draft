# Draft

*Draft is a template for writing Learnpoint design drafts.*

### Requirements

- [Install Deno](https://deno.land/manual/getting_started/installation) on your computer.
- [Install Piko](https://github.com/learnpoint/piko) on your computer.

### Use Draft

Let's say you want to draft an idea for the Learnpoint gradebook...

1. Create a new draft named ```gradebook-idea```:

    ```bash
    $ piko copy learnpoint/draft gradebook-idea
    ```

    The command above will create a new folder named ```gradebook-idea``` and copy the files from ```learnpoint/draft``` into that folder.

2. Move into folder:

    ```bash
    $ cd gradebook-idea
    ```

3. Start the dev server:

    ```bash
    $ piko dev
    ```

4. Navigate to ```http://127.0.0.1:3333```.

5. Open your editor and write your draft in ```gradebook-idea/src```.

### Contribute

If you're a Learnpoint developer, feel free to fork this repo, write improvements, and make pull requests. Thank you!
