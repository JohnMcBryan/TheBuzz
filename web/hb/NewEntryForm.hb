<div id="NewEntryForm" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Create a Buzz</h4>
            </div>
            <form id="NewEntryForm-form" name="form">
            <div class="modal-body">
                <p>
                    <label for="NewEntryForm-title">Title:</label>
                    <input class="form-control" type="text" id="NewEntryForm-title" name="title" />
                </p>
                <p>
                    <label for="NewEntryForm-message">Message:</label>
                    <textarea class="form-control" id="NewEntryForm-message" name="message"></textarea>
                </p>

                <p>
                    <button type="button" class="btn btn-default" id="NewEntryForm-Video">Add Video</button>
                    <button type="button" class="btn btn-default" id="NewEntryForm-picture">Add Picture</button>
                </p>

                <p1>
                    <label for="NewEntryForm-url">Youtube Video URL:</label>
                    <input class="form-control" type="url" id="NewEntryForm-url" name="url" />
                </p1>

                <p2>
                    <label for="NewEntryForm-file">Upload File:</label>
                    <input type="file" id="NewEntryForm-file" name="file" />
                </p2>
            </div>
            </form>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" id="NewEntryForm-OK">OK</button>
                <button type="button" class="btn btn-default" id="NewEntryForm-Close">Cancel</button>

            </div>
        </div>
    </div>
</div>